import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { TrendingUp, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as d3 from "d3";

interface RainPoint {
  date: string;
  rainfall: number;
}

export default function Analytics() {
  const [rainData, setRainData] = useState<RainPoint[]>([]);

  // Load GPM CSV
  useEffect(() => {
    d3.csv("/gpm.csv")
      .then((data) => {
        const cleaned = data.map((d: any) => ({
          date: d.last_updated || d.date,
          rainfall: +d.precip_mm || +d.Precip_mm,
        }));
        setRainData(cleaned.filter((d) => d.date && !isNaN(d.rainfall)));
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  const rainDates = rainData.map((d) => d.date);
  const rainfallValues = rainData.map((d) => d.rainfall);

  // Smaller height for graph boxes
  const graphHeight = 400; // updated from 500

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground">Track trends and download insights</p>
          </div>
          <Button className="bg-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NDVI Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>NDVI Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="/modis_interactive_plot.html"
                width="100%"
                height={graphHeight}
                style={{ border: "none" }}
                title="MODIS NDVI Graph"
              ></iframe>
            </CardContent>
          </Card>

          {/* Rainfall Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Rainfall</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rainData.length > 0 ? (
                <Plot
                  data={[
                    {
                      x: rainDates,
                      y: rainfallValues,
                      type: "bar",
                      name: "Rainfall (mm)",
                      marker: { color: "blue" },
                    },
                  ]}
                  layout={{
                    title: "Rainfall Time Series",
                    xaxis: { title: "Date" },
                    yaxis: { title: "Rainfall (mm)" },
                    autosize: true,
                    margin: { t: 40, l: 50, r: 20, b: 40 },
                  }}
                  style={{ width: "100%", height: graphHeight }}
                />
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Loading Rainfall Data...
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
