# data_fetcher.py
"""
Smart Farming - Data Fetcher Module
-----------------------------------
Handles Google Earth Engine initialization and NDVI data retrieval.
Works with Flask backend (app.py).
"""

import os
from datetime import datetime


def init_ee(project=None):
    """
    Initialize Google Earth Engine using a service account JSON key.
    Requires:
        - GOOGLE_APPLICATION_CREDENTIALS  (path to service-account.json)
        - EE_PROJECT  (Google Cloud project_id)
    """
    import ee
    from google.oauth2 import service_account

    try:
        sa_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        project_id = project or os.environ.get("EE_PROJECT")

        if not sa_path or not os.path.exists(sa_path):
            raise FileNotFoundError(f"service-account.json not found at {sa_path}")

        if not project_id:
            raise ValueError("EE_PROJECT not set; please set your project_id")

        creds = service_account.Credentials.from_service_account_file(
            sa_path
        ).with_scopes([
            "https://www.googleapis.com/auth/earthengine",
            "https://www.googleapis.com/auth/cloud-platform"
        ])

        # ✅ Explicit initialization with credentials + project ID
        ee.Initialize(credentials=creds, project=project_id)
        print(f"✅ Earth Engine initialized successfully (project={project_id})")

    except Exception as e:
        print("❌ Earth Engine initialization error:", e)
        raise


def get_ndvi_value(lon, lat, start="2025-09-01", end=None, cloud_cover_thresh=40):
    """
    Returns mean NDVI value for a given point and date range.
    Uses Landsat-8 TOA imagery.
    """
    import ee

    if end is None:
        end = datetime.utcnow().strftime("%Y-%m-%d")

    pt = ee.Geometry.Point([lon, lat])
    col = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
           .filterDate(start, end)
           .filterBounds(pt)
           .filter(ee.Filter.lt("CLOUD_COVER", cloud_cover_thresh))
           .sort("CLOUD_COVER"))

    image = ee.Image(col.first())
    if image is None:
        return {"error": "no_image_found"}

    ndvi = image.normalizedDifference(["B5", "B4"]).rename("NDVI")
    stat = ndvi.reduceRegion(ee.Reducer.mean(), pt, scale=30, maxPixels=1e9)

    val = None
    try:
        val = stat.get("NDVI").getInfo()
    except Exception as e:
        print("getInfo error:", e)

    try:
        image_id = image.get("LANDSAT_SCENE_ID").getInfo()
    except Exception:
        try:
            image_id = image.id().getInfo()
        except Exception:
            image_id = None

    return {
        "lon": lon,
        "lat": lat,
        "ndvi": val,
        "image_id": image_id,
        "start": start,
        "end": end,
    }


def get_ndvi_timeseries(lon, lat, start="2024-01-01", end=None, max_images=200):
    """
    Returns NDVI time-series (list of date-NDVI pairs) for a given point.
    """
    import ee

    if end is None:
        end = datetime.utcnow().strftime("%Y-%m-%d")

    pt = ee.Geometry.Point([lon, lat])
    col = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
           .filterDate(start, end)
           .filterBounds(pt)
           .sort("system:time_start"))

    def extract(img):
        nd = img.normalizedDifference(["B5", "B4"]).rename("NDVI")
        mean = nd.reduceRegion(ee.Reducer.mean(), pt, scale=30, maxPixels=1e9)
        return ee.Feature(None, {
            "date": img.date().format("YYYY-MM-dd"),
            "ndvi": mean.get("NDVI")
        })

    feats = col.map(extract).limit(max_images)
    try:
        features = feats.getInfo().get("features", [])
    except Exception as e:
        print("getInfo error (timeseries):", e)
        return {"error": "timeseries_getinfo_failed", "message": str(e)}

    rows = []
    for f in features:
        props = f.get("properties", {})
        rows.append({"date": props.get("date"), "ndvi": props.get("ndvi")})

    return rows


def get_ndvi_tile_url(lon, lat, start="2025-09-01", end=None, vis_params=None):
    """
    Returns an Earth Engine map tile URL (usable in Leaflet / React-Leaflet).
    Example output:
        {
          "tile_url": "https://earthengine.googleapis.com/map/{mapid}/{z}/{x}/{y}?token={token}",
          "mapid": "...",
          "token": "...",
          "start": "...",
          "end": "..."
        }
    """
    import ee

    if end is None:
        end = datetime.utcnow().strftime("%Y-%m-%d")

    pt = ee.Geometry.Point([lon, lat])
    col = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
           .filterDate(start, end)
           .filterBounds(pt)
           .sort("CLOUD_COVER"))

    image = ee.Image(col.first())
    if image is None:
        return {"error": "no_image_found"}

    ndvi = image.normalizedDifference(["B5", "B4"]).rename("NDVI")

    if vis_params is None:
        vis_params = {"min": -0.5, "max": 0.8, "palette": ["red", "yellow", "green"]}

    mdict = ndvi.getMapId(vis_params)
    mapid = mdict.get("mapid")
    token = mdict.get("token")
    tile_url = f"https://earthengine.googleapis.com/map/{mapid}/{{z}}/{{x}}/{{y}}?token={token}"

    return {
        "mapid": mapid,
        "token": token,
        "tile_url": tile_url,
        "start": start,
        "end": end,
    }
