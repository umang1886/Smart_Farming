import { Bell, Download, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const alerts = [
  {
    id: 1,
    title: "High Pest Risk Alert",
    description:
      "Aphid activity detected in neighboring farms. Monitor your crops closely for the next 5 days.",
    severity: "high",
    category: "pest",
    date: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Heavy Rainfall Warning",
    description: "40-50mm rainfall expected in next 48 hours. Ensure proper drainage.",
    severity: "medium",
    category: "weather",
    date: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Optimal Harvest Window",
    description:
      "Weather conditions favorable for harvesting. NDVI readings indicate crop maturity.",
    severity: "low",
    category: "growth",
    date: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Soil Moisture Critical",
    description: "Moisture levels below 50%. Immediate irrigation recommended.",
    severity: "high",
    category: "growth",
    date: "2 days ago",
    read: true,
  },
];

export default function Alerts() {
  const activeAlerts = alerts.filter((a) => !a.read);
  const archivedAlerts = alerts.filter((a) => a.read);

  const AlertCard = ({ alert }: { alert: typeof alerts[0] }) => (
    <Card
      className={`animate-fade-in ${
        !alert.read ? "border-l-4 border-l-primary shadow-medium" : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-lg ${
                alert.severity === "high"
                  ? "bg-destructive/10"
                  : alert.severity === "medium"
                  ? "bg-warning/10"
                  : "bg-success/10"
              }`}
            >
              {alert.severity === "high" ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : (
                <Bell
                  className={`h-5 w-5 ${
                    alert.severity === "medium" ? "text-warning" : "text-success"
                  }`}
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{alert.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {alert.description}
              </p>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={
                    alert.severity === "high"
                      ? "border-destructive/50 text-destructive"
                      : alert.severity === "medium"
                      ? "border-warning/50 text-warning"
                      : "border-success/50 text-success"
                  }
                >
                  {alert.severity}
                </Badge>
                <Badge variant="secondary">{alert.category}</Badge>
                <span className="text-xs text-muted-foreground">{alert.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          {!alert.read && (
            <Button size="sm" variant="outline">
              <Check className="h-4 w-4 mr-2" />
              Mark as Read
            </Button>
          )}
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
              Alerts Center
            </h1>
            <p className="text-muted-foreground">
              Stay informed about critical farm events
            </p>
          </div>
          <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-2">
            {activeAlerts.length} Active
          </Badge>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">Active Alerts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeAlerts.length > 0 ? (
              activeAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
            ) : (
              <Card className="animate-fade-in">
                <CardContent className="p-12 text-center">
                  <Check className="h-16 w-16 mx-auto text-success mb-4" />
                  <h3 className="text-xl font-semibold mb-2">All Clear!</h3>
                  <p className="text-muted-foreground">
                    No active alerts at the moment. Your farm is in good shape.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
            {archivedAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
