import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account and notification preferences
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-1">
                  {["General", "Notifications", "Privacy", "Help & Support"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center px-3 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-100"
                    >
                      {item === "General" ? (
                        <span className="font-medium text-alert-purple">{item}</span>
                      ) : (
                        <span>{item}</span>
                      )}
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Settings */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your basic account settings
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(123) 456-7890" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-alert-purple hover:bg-alert-darkpurple">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive alerts
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive email alerts for new incidents
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive alerts on your device
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Critical Alerts Only</h4>
                      <p className="text-sm text-gray-500">
                        Only notify for high severity incidents
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Location-based Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Notify about incidents near my location
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-alert-purple hover:bg-alert-darkpurple">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
