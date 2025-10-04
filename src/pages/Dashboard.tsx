import { Cloud, Droplets, Leaf, Bell, Download, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const metrics = [
  {
    title: "NDVI Index",
    value: "0.78",
    subtitle: "Healthy",
    icon: Leaf,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Rainfall",
    value: "24mm",
    subtitle: "Last 7 days",
    icon: Droplets,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Soil Moisture",
    value: "68%",
    subtitle: "Optimal",
    icon: Cloud,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Temperature",
    value: "28°C",
    subtitle: "Current",
    icon: Cloud,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const alerts = [
  { id: 1, text: "High pest risk in next 5 days", severity: "warning", time: "2h ago" },
  { id: 2, text: "Optimal harvest window approaching", severity: "success", time: "5h ago" },
  { id: 3, text: "Rainfall expected tomorrow", severity: "info", time: "1d ago" },
];

const tips = [
  "🌱 Consider nitrogen-rich fertilizer application this week",
  "💧 Irrigation recommended in 2-3 days based on forecast",
  "🦗 Monitor for aphid activity during evening hours",
  "📊 NDVI trends show excellent crop health progression",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Farm Dashboard
          </h1>
          <p className="text-muted-foreground flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Farm Location: Maharashtra, India</span>
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className="hover:shadow-medium transition-shadow duration-300 animate-fade-in"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Widget */}
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-primary" />
                <span>7-Day Weather Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                  <div
                    key={day}
                    className="text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="text-xs font-medium mb-2">{day}</p>
                    <div className="text-2xl mb-2">
                      {idx < 3 ? "☀️" : idx < 5 ? "⛅" : "🌧️"}
                    </div>
                    <p className="text-sm font-semibold">{26 + idx}°C</p>
                    {idx >= 5 && (
                      <p className="text-xs text-primary mt-1">{idx * 3}mm</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-secondary" />
                  <span>Alerts</span>
                </CardTitle>
                <Badge className="bg-secondary/20 text-secondary">{alerts.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.severity === "warning"
                        ? "border-warning/50 bg-warning/5"
                        : alert.severity === "success"
                        ? "border-success/50 bg-success/5"
                        : "border-primary/50 bg-primary/5"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{alert.text}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Farming Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-border"
                  >
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-primary" size="lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  View Farm Map
                </Button>
                <Button className="w-full justify-start bg-secondary" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download Weekly Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-2"
                  size="lg"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Configure Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
