
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wind, Droplets, Trash2, User, Bell, ChevronRight, CloudRain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SOSButton from '@/components/sos/SOSButton';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const alerts = [
    { id: 1, type: 'air', message: 'High AQI levels in Andheri East', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'water', message: 'Water contamination reported in Dharavi', time: '4 hours ago', severity: 'medium' },
    { id: 3, type: 'flood', message: 'Flooding risk in Kurla West', time: '1 day ago', severity: 'low' },
  ];

  const healthStats = [
    { label: 'Air Quality', value: 'Poor', icon: <Wind className="h-4 w-4" />, color: 'text-orange-500' },
    { label: 'Water Quality', value: 'Moderate', icon: <Droplets className="h-4 w-4" />, color: 'text-yellow-500' },
    { label: 'Flood Risk', value: 'Low', icon: <CloudRain className="h-4 w-4" />, color: 'text-green-500' },
    { label: 'Waste Levels', value: 'High', icon: <Trash2 className="h-4 w-4" />, color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name || 'User'}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's the current health status for your area in Mumbai.
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthStats.map((stat, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Alerts */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Health Alerts</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/alerts">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>
                    Latest health and safety alerts in your vicinity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <div 
                        key={alert.id} 
                        className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4 border-l-orange-500"
                      >
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                          alert.type === 'air' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 
                          alert.type === 'water' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'
                        }`}>
                          {alert.type === 'air' && <Wind className="h-5 w-5" />}
                          {alert.type === 'water' && <Droplets className="h-5 w-5" />}
                          {alert.type === 'flood' && <CloudRain className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{alert.message}</h4>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">2.3 km from you</span>
                            <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                              alert.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {alert.severity} severity
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/map">
                      Open Full Health Map
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div>
              <Card className="animate-fade-in delay-100">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Access key features of the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" asChild variant="outline">
                    <Link to="/map">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Health Map
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700" asChild>
                    <Link to="/sos">
                      <Bell className="mr-2 h-4 w-4" />
                      Emergency SOS
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild variant="outline">
                    <Link to="/chatbot">
                      <User className="mr-2 h-4 w-4" />
                      Mental Health Support
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild variant="outline">
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Update Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Mental Health Card */}
              <Card className="mt-6 animate-fade-in delay-200">
                <CardHeader className="pb-2">
                  <CardTitle>Mental Health Check-in</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    How are you feeling today? Our AI assistant can help you manage stress and anxiety.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/chatbot">
                      Talk to Mental Health Assistant
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <SOSButton />
    </div>
  );
};

export default Dashboard;
