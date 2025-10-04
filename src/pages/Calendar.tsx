import { Calendar as CalendarIcon, Sprout, Flower, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = [
  {
    id: 1,
    name: "Sowing",
    date: "Nov 15, 2024",
    status: "completed",
    icon: Sprout,
    color: "text-success",
  },
  {
    id: 2,
    name: "Germination",
    date: "Nov 25, 2024",
    status: "completed",
    icon: Sprout,
    color: "text-success",
  },
  {
    id: 3,
    name: "Tillering",
    date: "Dec 20, 2024",
    status: "completed",
    icon: Sprout,
    color: "text-success",
  },
  {
    id: 4,
    name: "Jointing",
    date: "Jan 30, 2025",
    status: "current",
    icon: Sprout,
    color: "text-primary",
  },
  {
    id: 5,
    name: "Booting",
    date: "Feb 25, 2025",
    status: "upcoming",
    icon: Flower,
    color: "text-warning",
  },
  {
    id: 6,
    name: "Heading",
    date: "Mar 10, 2025",
    status: "upcoming",
    icon: Flower,
    color: "text-warning",
  },
  {
    id: 7,
    name: "Flowering",
    date: "Mar 20, 2025",
    status: "upcoming",
    icon: Flower,
    color: "text-secondary",
  },
  {
    id: 8,
    name: "Grain Fill",
    date: "Mar 30, 2025",
    status: "upcoming",
    icon: Package,
    color: "text-muted-foreground",
  },
  {
    id: 9,
    name: "Ripening",
    date: "Apr 5, 2025",
    status: "upcoming",
    icon: Package,
    color: "text-muted-foreground",
  },
  {
    id: 10,
    name: "Harvest",
    date: "Apr 10, 2025",
    status: "upcoming",
    icon: Package,
    color: "text-muted-foreground",
  },
];

const recommendations = [
  {
    id: 1,
    title: "🟡 High Pest Risk Alert",
    description: "Monitor for aphids during evening. Apply neem oil if detected.",
    severity: "warning",
    days: 5,
  },
  {
    id: 2,
    title: "💧 Irrigation Recommended",
    description: "Soil moisture dropping. Schedule irrigation in 3-4 days.",
    severity: "info",
    days: 4,
  },
  {
    id: 3,
    title: "🌱 Fertilization Window",
    description: "Apply nitrogen-based fertilizer during jointing stage.",
    severity: "success",
    days: 7,
  },
];

export default function Calendar() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Crop Calendar
          </h1>
          <p className="text-muted-foreground">
            Track growth stages and get timely recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span>Growth Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  return (
                    <div key={stage.id} className="flex items-start space-x-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`p-2 rounded-full ${
                            stage.status === "completed"
                              ? "bg-success/20"
                              : stage.status === "current"
                              ? "bg-primary/20 animate-pulse-glow"
                              : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              stage.status === "completed"
                                ? "text-success"
                                : stage.status === "current"
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        {idx < stages.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              stage.status === "completed"
                                ? "bg-success/30"
                                : "bg-muted"
                            }`}
                          />
                        )}
                      </div>

                      {/* Stage Info */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{stage.name}</h3>
                          <Badge
                            variant={
                              stage.status === "completed"
                                ? "default"
                                : stage.status === "current"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              stage.status === "current" ? "animate-pulse" : ""
                            }
                          >
                            {stage.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{stage.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="lg:col-span-1 h-fit animate-fade-in">
            <CardHeader>
              <CardTitle>Upcoming Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-lg border ${
                      rec.severity === "warning"
                        ? "border-warning/50 bg-warning/5"
                        : rec.severity === "success"
                        ? "border-success/50 bg-success/5"
                        : "border-primary/50 bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {rec.days}d
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {rec.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
