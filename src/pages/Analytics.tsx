import { TrendingUp, Download, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground">
              Track trends and download insights
            </p>
          </div>
          <Button className="bg-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NDVI Trends */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>NDVI Trends (30 Days)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-success/10 to-success/5 rounded-lg flex items-center justify-center border border-success/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-success mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Time-series graph placeholder
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Integrate Plotly.js or Recharts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rainfall vs Soil Moisture */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Rainfall vs Soil Moisture</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Correlation graph placeholder
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Variations */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                <span>Temperature Variations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg flex items-center justify-center border border-warning/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-warning mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Temperature trends placeholder
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Performance */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>Seasonal Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg flex items-center justify-center border border-secondary/20">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-secondary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Comparison chart placeholder
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Summary */}
        <Card className="mt-6 animate-fade-in">
          <CardHeader>
            <CardTitle>AI-Generated Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-semibold text-success mb-2">✓ Excellent Crop Health</h4>
                <p className="text-sm text-muted-foreground">
                  Your NDVI values show consistent improvement over the past 30 days,
                  indicating healthy crop growth and adequate nutrition.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <h4 className="font-semibold text-warning mb-2">⚠ Moisture Attention Needed</h4>
                <p className="text-sm text-muted-foreground">
                  Soil moisture is trending downward. Consider irrigation within the next
                  3-5 days to maintain optimal growth conditions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">ℹ Rainfall Expected</h4>
                <p className="text-sm text-muted-foreground">
                  Weather models predict 15-20mm rainfall in the coming week, which should
                  replenish soil moisture naturally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
