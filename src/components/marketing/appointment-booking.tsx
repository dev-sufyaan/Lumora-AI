"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CalendarIcon, CheckIcon, EyeIcon, TrashIcon, LockIcon, UnlockIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade"; 
import { FADE_IN_VARIANTS } from "@/constants";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import LoadingIcon from "../ui/loading-icon";

// Import appointment service
import { 
  getAllAppointments, 
  createAppointment, 
  deleteAppointment,
  Appointment 
} from "@/services/appointmentService";

const ADMIN_PASSWORD = "admin123";

const AppointmentBooking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  // Load appointments from Supabase on component mount and when admin status changes
  useEffect(() => {
    // Only fetch appointments when admin view is active and we're in the browser
    if (isAdmin && typeof window !== 'undefined') {
      fetchAppointments();
    }
    
    // Check if admin view is enabled with keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + A to toggle admin login modal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        setShowAdminLogin(true);
      }
    };
    
    // Only add event listeners in browser environment
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAdmin]);

  // Fetch appointments from Supabase
  const fetchAppointments = async () => {
    try {
      setIsLoadingAppointments(true);
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      toast.success("Admin access granted");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !phone || !date || !time || !topic) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate a simple UUID that's compatible with Supabase
      const generateSimpleId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

      // Create new appointment object with a simple ID format
      const newAppointment = {
        id: generateSimpleId(),
        name,
        email,
        phone,
        date,
        time,
        topic,
        created_at: new Date().toISOString()
      };
      
      console.log('Attempting to create appointment:', newAppointment);
      
      // Save to Supabase
      await createAppointment(newAppointment);
      
      // Complete the booking process
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Appointment booked successfully!");
    } catch (error: any) {
      console.error('Detailed booking error:', {
        message: error?.message,
        details: error?.details,
        code: error?.code,
        hint: error?.hint
      });
      
      // Show a more helpful error message based on error type
      if (error?.code === '42P01') {
        toast.error('Database setup required. Please contact support.');
      } else if (error?.code === 'PGRST301') {
        toast.error('Database connection issue. Please try again later.');
      } else if (error?.message?.includes('fetch')) {
        toast.error('Network connection issue. Please check your internet connection.');
      } else if (error?.code === '23502') {
        toast.error('Missing required fields. Please fill in all fields.');
      } else if (error?.code === '22P02') {
        toast.error('Invalid data format. Please try again.');
      } else {
        toast.error(`Failed to book appointment: ${error?.message || 'Unknown error'}`); 
      }
      
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setTopic("");
    setIsSubmitted(false);
  };
  
  const handleDeleteAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      // Refresh the appointments list
      fetchAppointments();
      toast.success("Appointment deleted");
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get topic label from value
  const getTopicLabel = (value: string) => {
    const topics = {
      'product-demo': 'Platform Demo',
      'pricing': 'Pricing For Universities',
      'integration': 'LMS Integration Options',
      'custom': 'Content Creator Solutions'
    };
    return topics[value as keyof typeof topics] || value;
  };
  
  // Get time label from value
  const getTimeLabel = (value: string) => {
    const times = {
      '9-10': '9:00 AM - 10:00 AM',
      '10-11': '10:00 AM - 11:00 AM',
      '11-12': '11:00 AM - 12:00 PM',
      '13-14': '1:00 PM - 2:00 PM',
      '14-15': '2:00 PM - 3:00 PM',
      '15-16': '3:00 PM - 4:00 PM',
      '16-17': '4:00 PM - 5:00 PM'
    };
    return times[value as keyof typeof times] || value;
  };

  // Handle WhatsApp contact
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/919318441197', '_blank');
  };

  return (
    <div id="book-appointment" className="py-16 md:py-24 lg:py-32 w-full relative">
      <Container>
        <motion.div variants={FADE_IN_VARIANTS} className="flex flex-col items-center text-center">
          <SectionBadge title="Schedule a Demo" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium mt-6">
            Book your free consultation
          </h2>
          <p className="text-accent-foreground/60 max-w-md mx-auto mt-4">
            Schedule a personalized demo to see how Lumora AI can transform your university&apos;s LMS or enhance your educational content.
          </p>
        </motion.div>
      </Container>
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg p-6 shadow-lg border border-border max-w-sm w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <LockIcon className="w-4 h-4 mr-2" />
                Admin Access
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAdminLogin(false)}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>
            
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Enter Admin Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdminLogin(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      <Container className="mt-10">
        {isAdmin ? (
          <div className="w-full max-w-4xl mx-auto bg-card rounded-lg p-6 md:p-8 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium flex items-center">
                <UnlockIcon className="w-5 h-5 mr-2" />
                Admin Dashboard
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAdmin(false)}
              >
                Exit Admin View
              </Button>
            </div>
            
            {isLoadingAppointments ? (
              <div className="flex justify-center items-center py-12">
                <LoadingIcon size="lg" />
                <span className="ml-2">Loading appointments...</span>
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No appointments booked yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2 hidden md:table-cell">Phone</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2 hidden md:table-cell">Time</th>
                      <th className="text-left p-2 hidden md:table-cell">Topic</th>
                      <th className="text-center p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-border hover:bg-accent/5">
                        <td className="p-2">{appointment.name}</td>
                        <td className="p-2 text-xs md:text-sm">{appointment.email}</td>
                        <td className="p-2 hidden md:table-cell">{appointment.phone}</td>
                        <td className="p-2">{formatDate(appointment.date)}</td>
                        <td className="p-2 hidden md:table-cell">{getTimeLabel(appointment.time)}</td>
                        <td className="p-2 hidden md:table-cell">{getTopicLabel(appointment.topic)}</td>
                        <td className="p-2 text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-destructive hover:text-destructive/80 h-8 w-8 p-0"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : !isSubmitted ? (
          <motion.form
            variants={FADE_IN_VARIANTS}
            animate="visible"
            initial="hidden"
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-card rounded-lg p-6 md:p-8 shadow-sm border border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>
              
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>
              
              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  disabled={isLoading}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full"
                />
              </div>
              
              <div className="w-full">
                <label htmlFor="topic" className="block text-sm font-medium mb-2">
                  Consultation Topic
                </label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger disabled={isLoading} className="w-full">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-demo">Platform Demo</SelectItem>
                    <SelectItem value="pricing">Pricing For Universities</SelectItem>
                    <SelectItem value="integration">LMS Integration Options</SelectItem>
                    <SelectItem value="custom">Content Creator Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full">
                <label htmlFor="date" className="block text-sm font-medium mb-2">
                  Preferred Date
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  disabled={isLoading}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="w-full">
                <label htmlFor="time" className="block text-sm font-medium mb-2">
                  Preferred Time
                </label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger disabled={isLoading} className="w-full">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-10">9:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10-11">10:00 AM - 11:00 AM</SelectItem>
                    <SelectItem value="11-12">11:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="13-14">1:00 PM - 2:00 PM</SelectItem>
                    <SelectItem value="14-15">2:00 PM - 3:00 PM</SelectItem>
                    <SelectItem value="15-16">3:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="16-17">4:00 PM - 5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <LoadingIcon size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  "Book Consultation"
                )}
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            variants={FADE_IN_VARIANTS}
            animate="visible"
            initial="hidden"
            className="w-full max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-sm border border-border text-center"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <CheckIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="mt-6 text-xl font-medium">Appointment Confirmed</h3>
            <p className="mt-2 text-muted-foreground">
              Thank you for booking a consultation. Our team will contact you to discuss how we can enhance your educational platform.
            </p>
            <div className="mt-6 space-y-2">
              <div className="bg-accent/10 rounded-md p-4 text-left max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Name:</div>
                  <div className="text-sm font-medium">{name}</div>
                  
                  <div className="text-sm text-muted-foreground">Email:</div>
                  <div className="text-sm font-medium">{email}</div>
                  
                  <div className="text-sm text-muted-foreground">Phone:</div>
                  <div className="text-sm font-medium">{phone}</div>
                  
                  <div className="text-sm text-muted-foreground">Date:</div>
                  <div className="text-sm font-medium">{formatDate(date)}</div>
                  
                  <div className="text-sm text-muted-foreground">Time:</div>
                  <div className="text-sm font-medium">{getTimeLabel(time)}</div>
                  
                  <div className="text-sm text-muted-foreground">Topic:</div>
                  <div className="text-sm font-medium">{getTopicLabel(topic)}</div>
                </div>
              </div>
              <Button
                type="button"
                variant="outline" 
                onClick={handleReset}
              >
                Book another appointment
              </Button>
            </div>
          </motion.div>
        )}

        {/* Add WhatsApp contact option after the form */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <p className="text-muted-foreground mb-2">Prefer to chat directly?</p>
          <Button 
            variant="outline" 
            onClick={handleWhatsAppContact}
            className="flex items-center gap-2 mx-auto"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="text-green-500"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
            </svg>
            Contact via WhatsApp
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default AppointmentBooking;