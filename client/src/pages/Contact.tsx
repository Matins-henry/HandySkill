import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema } from "@shared/schema";
import { motion } from "framer-motion";

// Extend the contact message schema with validation
const contactFormSchema = insertContactMessageSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize form with default values
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
    },
  });
  
  // Submit contact message mutation
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond to your inquiry soon.",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have questions about our services? Need a quote? Get in touch with our team.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <motion.div 
                className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-sm mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-heading font-semibold mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Our Location</h4>
                      <p className="text-gray-600">123 Repair Street, Fixitville, CA 90210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 8am-6pm, Sat: 9am-3pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Us</h4>
                      <p className="text-gray-600">info@handyfix.com</p>
                      <p className="text-gray-600">support@handyfix.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Google Maps Embed */}
              <motion.div 
                className="bg-gray-100 rounded-xl overflow-hidden h-64 md:h-80 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355571521!2d-118.69192117190083!3d34.02016130653036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1635352605356!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Google Maps Location"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <motion.div 
              className="bg-gray-100 rounded-xl p-6 md:p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-heading font-semibold mb-6">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="carpentry">Carpentry</SelectItem>
                            <SelectItem value="painting">Painting</SelectItem>
                            <SelectItem value="flooring">Flooring</SelectItem>
                            <SelectItem value="maintenance">Home Maintenance</SelectItem>
                            <SelectItem value="other">Other (Please Specify)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe what you need..." 
                            className="resize-none" 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, pricing, and policies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">What areas do you service?</h3>
              <p className="text-gray-600">
                We currently service the greater Los Angeles area, including surrounding cities within a 30-mile radius.
              </p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">Do you offer emergency services?</h3>
              <p className="text-gray-600">
                Yes, we offer emergency services for certain situations. Please call our emergency line at (555) 999-8888.
              </p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">What forms of payment do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, cash, checks, and digital payment methods like Venmo and PayPal.
              </p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">Are your technicians licensed and insured?</h3>
              <p className="text-gray-600">
                Yes, all our technicians are fully licensed, bonded, and insured for your protection and peace of mind.
              </p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">Do you provide free estimates?</h3>
              <p className="text-gray-600">
                Yes, we provide free estimates for all standard services. Specialized projects may require an assessment fee.
              </p>
            </Card>
            
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold mb-2">What is your warranty policy?</h3>
              <p className="text-gray-600">
                We offer a 90-day warranty on all workmanship and labor. Manufacturer warranties apply to all installed products.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book your service today or contact us for any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" className="shadow-lg w-full sm:w-auto" onClick={() => window.location.href = "/booking"}>
              Schedule Service
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto" onClick={() => window.location.href = "tel:5551234567"}>
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
