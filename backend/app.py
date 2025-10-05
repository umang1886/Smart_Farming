from flask import Flask, request, jsonify
from flask_cors import CORS
import ee, os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# ✅ Initialize Earth Engine using service account if available
def initialize_earth_engine() -> None:
    """Initialize EE with service account credentials if present; fallback to default."""
    try:
        project_id = os.environ.get("EE_PROJECT") or "smart-42404"
        sa_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        # Fallback to local service account in backend directory
        if not sa_path:
            candidate = os.path.join(os.path.dirname(__file__), "service-account.json")
            if os.path.exists(candidate):
                os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = candidate
                sa_path = candidate

        if sa_path and os.path.exists(sa_path):
            # Initialize with explicit credentials
            from google.oauth2 import service_account
            creds = service_account.Credentials.from_service_account_file(sa_path).with_scopes([
                "https://www.googleapis.com/auth/earthengine",
                "https://www.googleapis.com/auth/cloud-platform",
            ])
            ee.Initialize(credentials=creds, project=project_id)
        else:
            # Attempt default initialization (works if `earthengine authenticate` done)
            ee.Initialize(project=project_id)
        print("✅ Earth Engine initialized (project=", project_id, ")")
    except Exception as e:
        print("❌ EE init failed:", e)
        raise

initialize_earth_engine()

def _parse_geometry(geo_json) -> ee.Geometry:
    if not geo_json:
        raise ValueError("Missing 'geometry'")
    try:
        return ee.Geometry(geo_json)
    except Exception as e:
        raise ValueError(f"Invalid geometry: {e}")

def _parse_dates(start: str | None, end: str | None) -> tuple[str, str]:
    if not start:
        raise ValueError("Missing 'start' date")
    try:
        s = datetime.fromisoformat(start)
    except Exception:
        raise ValueError("Invalid 'start' date; expected ISO format YYYY-MM-DD")

    if end:
        try:
            e = datetime.fromisoformat(end)
        except Exception:
            raise ValueError("Invalid 'end' date; expected ISO format YYYY-MM-DD")
    else:
        e = datetime.utcnow()

    if e < s:
        raise ValueError("'end' must be on/after 'start'")
    # Ensure inclusive end by advancing one day for collections
    return s.strftime("%Y-%m-%d"), e.strftime("%Y-%m-%d")

def _landsat_l2_scale(img: ee.Image) -> ee.Image:
    # Apply scale and offset for L2 SR bands (scale=0.0000275, offset=-0.2)
    scale = ee.Image(0.0000275)
    offset = ee.Image(-0.2)
    sr_bands = ["SR_B2","SR_B3","SR_B4","SR_B5","SR_B6","SR_B7"]
    scaled = img.select(sr_bands).multiply(scale).add(offset).copyProperties(img, img.propertyNames())
    return img.addBands(scaled, overwrite=True)

def _landsat_l2_cloudmask(img: ee.Image) -> ee.Image:
    qa = img.select("QA_PIXEL")
    cloud = qa.bitwiseAnd(1 << 5).eq(0)  # Bit 5: Cloud
    cloud_shadow = qa.bitwiseAnd(1 << 3).eq(0)  # Bit 3: Cloud shadow
    cirrus = qa.bitwiseAnd(1 << 7).eq(0)  # Bit 7: Cirrus
    snow = qa.bitwiseAnd(1 << 4).eq(0)  # Bit 4: Snow
    mask = cloud.And(cloud_shadow).And(cirrus).And(snow)
    return img.updateMask(mask)


@app.route("/api/ndvi", methods=["POST"])
def get_ndvi():
    try:
        body = request.get_json(force=True, silent=False) or {}
        geom = _parse_geometry(body.get("geometry"))
        start, end = _parse_dates(body.get("start"), body.get("end"))
        scale = int(body.get("scale", 30))

        dataset = (ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
                   .filterBounds(geom)
                   .filterDate(start, end))

        def prep(img):
            img = _landsat_l2_scale(img)
            img = _landsat_l2_cloudmask(img)
            ndvi = img.normalizedDifference(["SR_B5", "SR_B4"]).rename("NDVI")
            return ndvi.set("date", img.date().format("YYYY-MM-dd"))

        ndvi_series = dataset.map(prep)

        def to_feature(img):
            mean = img.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=geom,
                scale=scale,
                maxPixels=1e13,
                bestEffort=True,
                tileScale=2,
            )
            return ee.Feature(None, {"date": img.get("date"), "ndvi": mean.get("NDVI")})

        stats = ndvi_series.map(to_feature)
        data = ee.List(stats.aggregate_array("properties")).getInfo()
        # Filter out nulls and sort by date
        cleaned = [d for d in data if d and d.get("ndvi") is not None and d.get("date")]
        cleaned.sort(key=lambda x: x["date"]) 
        return jsonify({"status": "success", "data": cleaned})

    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/api/rainfall_soil", methods=["POST"])
def rainfall_soil():
    try:
        body = request.get_json(force=True, silent=False) or {}
        geom = _parse_geometry(body.get("geometry"))
        start, end = _parse_dates(body.get("start"), body.get("end"))

        rainfall = (ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
                    .filterBounds(geom)
                    .filterDate(start, end))

        soil = (ee.ImageCollection("NASA_USDA/HSL/SMAP10KM_soil_moisture")
                .filterBounds(geom)
                .filterDate(start, end))

        def combine(date):
            d = ee.Date(date)
            next_d = d.advance(1, "day")
            rain_img = rainfall.filterDate(d, next_d).mean()
            soil_img = soil.filterDate(d, next_d).mean()
            rain_mean = rain_img.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=geom,
                scale=5500,
                maxPixels=1e13,
                bestEffort=True,
                tileScale=2,
            ).get("precipitation")
            soil_mean = soil_img.reduceRegion(
                reducer=ee.Reducer.mean(),
                geometry=geom,
                scale=10000,
                maxPixels=1e13,
                bestEffort=True,
                tileScale=2,
            ).get("ssm")
            return ee.Feature(None, {
                "date": d.format("YYYY-MM-dd"),
                "precip_mm": rain_mean,
                "soil_moisture": soil_mean,
            })

        # Inclusive daily dates from start to end
        start_d = ee.Date(start)
        end_d = ee.Date(end)
        n_days = end_d.difference(start_d, "day").add(1)
        dates = ee.List.sequence(0, n_days.subtract(1)).map(lambda i: start_d.advance(i, "day"))

        fc = ee.FeatureCollection(dates.map(combine))
        data = ee.List(fc.aggregate_array("properties")).getInfo()
        cleaned = [r for r in data if r and r.get("date")]
        cleaned.sort(key=lambda x: x["date"]) 
        return jsonify({"status": "success", "data": cleaned})

    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/api/health", methods=["GET"]) 
def health():
    try:
        # Simple EE ping: get server time
        _ = ee.Date.now().format("YYYY-MM-dd").getInfo()
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "degraded", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
