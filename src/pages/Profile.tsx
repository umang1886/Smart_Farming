import { User, MapPin, Bell, Globe, Plus, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const farms = [
  { id: 1, name: "North Field", area: "12.5 ha", crop: "Wheat", status: "active" },
  { id: 2, name: "South Valley", area: "8.3 ha", crop: "Rice", status: "active" },
  { id: 3, name: "East Meadow", area: "15.0 ha", crop: "Corn", status: "inactive" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Farmer Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your farms and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-1 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Account Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl mb-4">
                  👨‍🌾
                </div>
                <h3 className="text-xl font-semibold">Rajesh Kumar</h3>
                <p className="text-sm text-muted-foreground">Farmer ID: FK-2024-1234</p>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Maharashtra, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
              </div>

              <Button className="w-full bg-primary mt-4">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Farms & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farms */}
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Farms</CardTitle>
                  <Button className="bg-secondary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Farm
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farms.map((farm) => (
                    <div
                      key={farm.id}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{farm.name}</h4>
                            <Badge
                              variant={farm.status === "active" ? "default" : "secondary"}
                            >
                              {farm.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>📐 {farm.area}</span>
                            <span>🌾 {farm.crop}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-secondary" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get SMS for critical alerts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weather Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Daily weather forecasts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pest Risk Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Early warning for pest threats
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Other Settings */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Other Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Preferred Language
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>English</option>
                      <option>हिन्दी (Hindi)</option>
                      <option>தமிழ் (Tamil)</option>
                      <option>తెలుగు (Telugu)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Primary Crop Type
                    </label>
                    <select className="w-full p-2 rounded-lg border border-input bg-background">
                      <option>Wheat</option>
                      <option>Rice</option>
                      <option>Corn</option>
                      <option>Sugarcane</option>
                      <option>Cotton</option>
                    </select>
                  </div>
                  <Button variant="destructive" className="w-full mt-4">
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
