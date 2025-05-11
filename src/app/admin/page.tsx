"use client";

import React, { useState, useEffect } from 'react';
import { CheckIcon, XIcon, Trash2Icon, EyeIcon, LockIcon } from "lucide-react";
import { 
  getAllAppointments, 
  deleteAppointment,
  updateAppointmentStatus,
  Appointment 
} from "@/services/appointmentService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Admin access key
const ADMIN_ACCESS_KEY = "3003";

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  // Fetch appointments
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  // Authenticate admin
  const handleAuthenticate = () => {
    if (accessKey === ADMIN_ACCESS_KEY) {
      setIsAuthenticated(true);
      setIsAuthenticating(false);
      localStorage.setItem('adminAuthenticated', 'true');
      toast.success("Admin access granted");
      fetchAppointments();
    } else {
      toast.error("Invalid access key");
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      await deleteAppointment(selectedAppointment.id);
      fetchAppointments();
      setDeleteDialogOpen(false);
      toast.success("Appointment deleted successfully");
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error("Failed to delete appointment");
    }
  };

  // Update appointment status
  const handleUpdateStatus = async (id: string, status: 'pending' | 'confirmed' | 'closed') => {
    setIsUpdatingStatus(true);
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments();
      toast.success(`Appointment marked as ${status}`);
      
      // Close details dialog if open
      if (detailDialogOpen) {
        setDetailDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error("Failed to update appointment status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Filter appointments by search term and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const currentStatus = appointment.status || 'pending';
    const matchesStatus = 
      statusFilter === "all" || 
      currentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Get topic label
  const getTopicLabel = (value: string) => {
    const topics: {[key: string]: string} = {
      'product-demo': 'Platform Demo',
      'pricing': 'Pricing For Universities',
      'integration': 'LMS Integration Options',
      'custom': 'Content Creator Solutions'
    };
    return topics[value] || value;
  };

  // Get time label
  const getTimeLabel = (value: string) => {
    const times: {[key: string]: string} = {
      '9-10': '9:00 AM - 10:00 AM',
      '10-11': '10:00 AM - 11:00 AM',
      '11-12': '11:00 AM - 12:00 PM',
      '13-14': '1:00 PM - 2:00 PM',
      '14-15': '2:00 PM - 3:00 PM',
      '15-16': '3:00 PM - 4:00 PM',
      '16-17': '4:00 PM - 5:00 PM'
    };
    return times[value] || value;
  };

  // Check session storage on component mount
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
    if (isAdmin) {
      setIsAuthenticated(true);
      setIsAuthenticating(false);
      fetchAppointments();
    } else {
      setIsAuthenticating(true);
      setIsAuthenticated(false);
    }
  }, []);

  // Handle keyboard enter for authentication
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuthenticate();
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {isAuthenticating ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockIcon size={18} />
              Admin Access Required
            </CardTitle>
            <CardDescription>
              Please enter your admin access key to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter access key"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                className="w-full" 
                onClick={handleAuthenticate}
              >
                Access Admin Panel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : isAuthenticated ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Lumora AI Admin Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                setIsAuthenticated(false);
                setIsAuthenticating(true);
              }}
            >
              Logout
            </Button>
          </div>

          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="appointments">Bookings</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Bookings</CardTitle>
                  <CardDescription>
                    Manage all client bookings and appointments
                  </CardDescription>
                  
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <Input
                      placeholder="Search by name, email, phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                    
                    <div className="flex gap-2">
                      <Button 
                        variant={statusFilter === "all" ? "default" : "outline"}
                        onClick={() => setStatusFilter("all")}
                        size="sm"
                      >
                        All
                      </Button>
                      <Button 
                        variant={statusFilter === "pending" ? "default" : "outline"}
                        onClick={() => setStatusFilter("pending")}
                        size="sm"
                      >
                        Pending
                      </Button>
                      <Button 
                        variant={statusFilter === "confirmed" ? "default" : "outline"}
                        onClick={() => setStatusFilter("confirmed")}
                        size="sm"
                      >
                        Confirmed
                      </Button>
                      <Button 
                        variant={statusFilter === "closed" ? "default" : "outline"}
                        onClick={() => setStatusFilter("closed")}
                        size="sm"
                      >
                        Closed
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      No appointments found
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Name</th>
                            <th className="text-left p-3 font-medium">Email</th>
                            <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                            <th className="text-left p-3 font-medium hidden md:table-cell">Topic</th>
                            <th className="text-left p-3 font-medium">Status</th>
                            <th className="text-center p-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAppointments.map((appointment) => (
                            <tr 
                              key={appointment.id} 
                              className="border-b border-border hover:bg-muted/50"
                            >
                              <td className="p-3">{appointment.name}</td>
                              <td className="p-3">{appointment.email}</td>
                              <td className="p-3 hidden md:table-cell">{formatDate(appointment.date)}</td>
                              <td className="p-3 hidden md:table-cell">{getTopicLabel(appointment.topic)}</td>
                              <td className="p-3">
                                {getStatusBadge(appointment.status || 'pending')}
                              </td>
                              <td className="p-3">
                                <div className="flex justify-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedAppointment(appointment);
                                      setDetailDialogOpen(true);
                                    }}
                                  >
                                    <EyeIcon size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    disabled={isUpdatingStatus}
                                    onClick={() => handleUpdateStatus(appointment.id, "confirmed")}
                                    className="text-green-500 hover:text-green-700"
                                  >
                                    <CheckIcon size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    disabled={isUpdatingStatus}
                                    onClick={() => handleUpdateStatus(appointment.id, "closed")}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <XIcon size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setSelectedAppointment(appointment);
                                      setDeleteDialogOpen(true);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2Icon size={16} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Statistics</CardTitle>
                  <CardDescription>
                    Overview of booking metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Total Bookings</CardDescription>
                        <CardTitle className="text-3xl">{appointments.length}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Confirmed</CardDescription>
                        <CardTitle className="text-3xl">
                          {appointments.filter(a => (a.status || 'pending') === 'confirmed').length}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardDescription>Pending</CardDescription>
                        <CardTitle className="text-3xl">
                          {appointments.filter(a => !a.status || a.status === 'pending').length}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Most Requested Topics</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        appointments.reduce<{[key: string]: number}>((acc, appointment) => {
                          acc[appointment.topic] = (acc[appointment.topic] || 0) + 1;
                          return acc;
                        }, {})
                      )
                        .sort((a, b) => b[1] - a[1])
                        .map(([topic, count]) => (
                          <div key={topic} className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-4">
                              <div 
                                className="bg-primary rounded-full h-4" 
                                style={{ 
                                  width: `${(count / appointments.length) * 100}%` 
                                }}
                              ></div>
                            </div>
                            <div className="text-sm min-w-[120px] flex justify-between">
                              <span>{getTopicLabel(topic)}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Appointment Detail Dialog */}
          <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  Full information about the selected booking
                </DialogDescription>
              </DialogHeader>
              
              {selectedAppointment && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="font-medium">Name:</div>
                    <div>{selectedAppointment.name}</div>
                    
                    <div className="font-medium">Email:</div>
                    <div>{selectedAppointment.email}</div>
                    
                    <div className="font-medium">Phone:</div>
                    <div>{selectedAppointment.phone}</div>
                    
                    <div className="font-medium">Date:</div>
                    <div>{formatDate(selectedAppointment.date)}</div>
                    
                    <div className="font-medium">Time:</div>
                    <div>{getTimeLabel(selectedAppointment.time)}</div>
                    
                    <div className="font-medium">Topic:</div>
                    <div>{getTopicLabel(selectedAppointment.topic)}</div>
                    
                    <div className="font-medium">Booked On:</div>
                    <div>{new Date(selectedAppointment.created_at).toLocaleString()}</div>
                    
                    <div className="font-medium">Status:</div>
                    <div>{getStatusBadge(selectedAppointment.status || 'pending')}</div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="font-medium mb-2">Change Status:</div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-green-500 hover:bg-green-500 hover:text-white"
                        disabled={isUpdatingStatus}
                        onClick={() => handleUpdateStatus(selectedAppointment.id, "confirmed")}
                      >
                        <CheckIcon size={16} className="mr-2" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-500 hover:bg-gray-500 hover:text-white"
                        disabled={isUpdatingStatus}
                        onClick={() => handleUpdateStatus(selectedAppointment.id, "closed")}
                      >
                        <XIcon size={16} className="mr-2" />
                        Close
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500 hover:bg-red-500 hover:text-white ml-auto"
                        onClick={() => {
                          setDetailDialogOpen(false);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2Icon size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  appointment and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDeleteAppointment}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : null}
    </div>
  );
} 