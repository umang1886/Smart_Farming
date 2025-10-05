import { useState, useEffect } from "react";
import { Layers, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { MapContainer, TileLayer, CircleMarker, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const layersConfig = [
  { id: "ndvi", name: "NDVI (Crop Health)", color: "bg-success" },
  { id: "rainfall", name: "Rainfall", color: "bg-primary" },
  { id: "moisture", name: "Soil Moisture", color: "bg-secondary" },
  { id: "temp", name: "Temperature", color: "bg-warning" },
];

export default function Map() {
  const [activeLayers, setActiveLayers] = useState<string[]>(["ndvi"]);
  const [viewType, setViewType] = useState<"satellite" | "vector">("satellite");
  const [ndviTile, setNdviTile] = useState<string | null>(null);

  const lat = 23.0225;
  const lon = 72.5714;

  // Toggle active layers
  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  // Fetch NDVI tile URL from backend
  const fetchNdviTile = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/ndvi_tile?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data.tile_url) setNdviTile(data.tile_url);
      console.log("NDVI Tile:", data);
    } catch (err) {
      console.error("Error fetching NDVI tile:", err);
    }
  };

  // Fetch NDVI tile when layer is active
  useEffect(() => {
    if (activeLayers.includes("ndvi")) {
      fetchNdviTile();
    } else {
      setNdviTile(null);
    }
  }, [activeLayers]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Interactive Farm Map
          </h1>
          <p className="text-muted-foreground">
            Visualize crop health and environmental data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Sidebar */}
          <Card className="lg:col-span-1 h-fit animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>Map Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Layer toggles */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Data Layers</h3>
                <div className="space-y-2">
                  {layersConfig.map((layer) => (
                    <Button
                      key={layer.id}
                      variant={activeLayers.includes(layer.id) ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => toggleLayer(layer.id)}
                    >
                      <div className={`w-3 h-3 rounded-full ${layer.color} mr-2`} />
                      {layer.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Base map type */}
              <div>
                <h3 className="text-sm font-semibold mb-3">View Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={viewType === "satellite" ? "default" : "outline"}
                    onClick={() => setViewType("satellite")}
                  >
                    Satellite
                  </Button>
                  <Button
                    variant={viewType === "vector" ? "default" : "outline"}
                    onClick={() => setViewType("vector")}
                  >
                    Vector
                  </Button>
                </div>
              </div>

              {/* Date picker placeholder */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Date Range</h3>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map display */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="p-0">
                <MapContainer center={[lat, lon]} zoom={12} style={{ height: "600px", width: "100%" }}>
                  {/* Base map */}
                  <TileLayer
                    url={
                      viewType === "satellite"
                        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        : "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    }
                  />

                  {/* NDVI overlay */}
                  {ndviTile && <TileLayer url={ndviTile} opacity={0.6} />}

                  {/* Example polygon for farm */}
                  <Polygon
                    positions={[
                      [23.024, 72.569],
                      [23.028, 72.574],
                      [23.025, 72.578],
                      [23.020, 72.576],
                    ]}
                    pathOptions={{ color: "green", fillOpacity: 0.3 }}
                  />

                  {/* Example farm marker */}
                  <CircleMarker
                    center={[lat, lon]}
                    radius={8}
                    pathOptions={{ color: "orange" }}
                  />
                </MapContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
