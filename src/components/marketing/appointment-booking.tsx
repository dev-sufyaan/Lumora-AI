"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CalendarIcon, CheckIcon, EyeIcon, TrashIcon, LockIcon, UnlockIcon } from "lucide-react";

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

// Define appointment type
interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  createdAt: string;
}

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

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
    
    // Check if admin view is enabled with keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + A to toggle admin login modal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        setShowAdminLogin(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    
    // Create new appointment object
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      date,
      time,
      topic,
      createdAt: new Date().toISOString()
    };
    
    // Update appointments list
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Complete the booking process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Appointment booked successfully!");
    }, 1000);
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
  
  const deleteAppointment = (id: string) => {
    const filteredAppointments = appointments.filter(app => app.id !== id);
    setAppointments(filteredAppointments);
    localStorage.setItem('appointments', JSON.stringify(filteredAppointments));
    toast.success("Appointment deleted");
  };
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get topic label from value
  const getTopicLabel = (value: string) => {
    const topics = {
      'product-demo': 'Product Demo',
      'pricing': 'Pricing & Plans',
      'integration': 'Integration Options',
      'custom': 'Custom Solution'
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

  return (
    <div id="book-appointment" className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full bg-accent/5">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <SectionBadge title="Schedule" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
            Book your consultation
          </h2>
          <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
            Schedule a free consultation with our experts to discover how Lumora can transform your learning experience
          </p>
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAdminLogin(true)}
              className="text-xs text-muted-foreground/70 hover:text-muted-foreground"
            >
              <LockIcon className="h-3 w-3 mr-1" />
              Admin
            </Button>
          </div>
        </div>
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
            
            {appointments.length === 0 ? (
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
                            onClick={() => deleteAppointment(appointment.id)}
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
                    <SelectItem value="product-demo">Product Demo</SelectItem>
                    <SelectItem value="pricing">Pricing & Plans</SelectItem>
                    <SelectItem value="integration">Integration Options</SelectItem>
                    <SelectItem value="custom">Custom Solution</SelectItem>
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
              Thank you for booking a consultation with us. We have sent a confirmation email with all the details.
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
      </Container>
    </div>
  );
};

export default AppointmentBooking; 