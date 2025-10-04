import { useState } from "react";
import { Layers, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const layers = [
  { id: "ndvi", name: "NDVI (Crop Health)", color: "bg-success" },
  { id: "rainfall", name: "Rainfall", color: "bg-primary" },
  { id: "moisture", name: "Soil Moisture", color: "bg-secondary" },
  { id: "temp", name: "Temperature", color: "bg-warning" },
];

export default function Map() {
  const [activeLayers, setActiveLayers] = useState(["ndvi"]);
  const [viewType, setViewType] = useState<"satellite" | "vector">("satellite");

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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
              {/* Layer Toggles */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Data Layers</h3>
                <div className="space-y-2">
                  {layers.map((layer) => (
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

              {/* View Type */}
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

              {/* Date Picker */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Date Range</h3>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
              </div>

              {/* Legend */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>High</span>
                    <div className="w-20 h-3 rounded-full bg-gradient-to-r from-success to-success/50" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Medium</span>
                    <div className="w-20 h-3 rounded-full bg-gradient-to-r from-warning to-warning/50" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Low</span>
                    <div className="w-20 h-3 rounded-full bg-gradient-to-r from-destructive to-destructive/50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Display */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="p-0">
                <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-muted">
                  {/* Placeholder Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-success/20 to-secondary/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <MapPin className="h-16 w-16 mx-auto text-primary animate-pulse" />
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Interactive Map View
                          </h3>
                          <p className="text-muted-foreground">
                            Integrate Mapbox or Leaflet for live satellite imagery
                          </p>
                          <div className="mt-4 space-x-2">
                            {activeLayers.map((layerId) => {
                              const layer = layers.find((l) => l.id === layerId);
                              return (
                                <Badge key={layerId} className={layer?.color}>
                                  {layer?.name}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Farm Polygon Overlay */}
                    <svg className="absolute inset-0 w-full h-full">
                      <polygon
                        points="200,150 600,200 550,450 250,400"
                        fill="rgba(20, 184, 166, 0.2)"
                        stroke="rgba(20, 184, 166, 0.8)"
                        strokeWidth="3"
                        className="animate-pulse-glow"
                      />
                      <circle
                        cx="400"
                        cy="300"
                        r="8"
                        fill="rgb(245, 158, 11)"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farm Info */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Selected Farm Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-xs text-muted-foreground mb-1">Area</p>
                    <p className="text-2xl font-bold text-success">12.5 ha</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Crop Type</p>
                    <p className="text-2xl font-bold text-primary">Wheat</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                    <p className="text-xs text-muted-foreground mb-1">Sowing Date</p>
                    <p className="text-sm font-semibold text-secondary">Nov 15, 2024</p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-xs text-muted-foreground mb-1">Est. Harvest</p>
                    <p className="text-sm font-semibold text-warning">Apr 10, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
