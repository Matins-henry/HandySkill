import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Wrench, User, Check } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema } from "@shared/schema";

// Extend the booking schema with additional validation
const bookingFormSchema = insertBookingSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  const [, setLocation] = useLocation();
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());
  const [bookingTime, setBookingTime] = useState<string>("");
  const { toast } = useToast();
  
  // Fetch services for dropdown
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // Initialize form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      serviceCategory: "",
      specificService: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
    },
  });
  
  // Book appointment mutation
  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      return apiRequest('POST', '/api/bookings', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been scheduled successfully.",
        variant: "success",
      });
      form.reset();
      setBookingDate(new Date());
      setBookingTime("");
      
      // Redirect to homepage after successful booking
      setTimeout(() => {
        setLocation("/");
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  const onSubmit = (data: BookingFormValues) => {
    // Format date as string
    const formattedData = {
      ...data,
      date: bookingDate ? format(bookingDate, "yyyy-MM-dd") : "",
      time: bookingTime,
    };
    
    // Submit the booking
    bookingMutation.mutate(formattedData);
  };
  
  // Time slots for selection
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Book Your Service
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Select a service, choose your preferred date and time, and we'll dispatch our skilled professionals to your location.
          </p>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Service Selection */}
                  <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                      <Wrench className="text-primary mr-2" />
                      Select a Service
                    </h3>
                    
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="serviceCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Service Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isLoadingServices ? (
                                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                                ) : (
                                  services?.map((service) => (
                                    <SelectItem key={service.id} value={service.category}>
                                      {service.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specificService"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specific Service</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Specific Service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {form.watch("serviceCategory") === "plumbing" && (
                                  <>
                                    <SelectItem value="leak-repair">Leak Repair</SelectItem>
                                    <SelectItem value="faucet-installation">Faucet Installation</SelectItem>
                                    <SelectItem value="pipe-repair">Pipe Repair</SelectItem>
                                    <SelectItem value="drain-cleaning">Drain Cleaning</SelectItem>
                                  </>
                                )}
                                {form.watch("serviceCategory") === "electrical" && (
                                  <>
                                    <SelectItem value="outlet-installation">Outlet Installation</SelectItem>
                                    <SelectItem value="lighting-installation">Lighting Installation</SelectItem>
                                    <SelectItem value="circuit-repair">Circuit Repair</SelectItem>
                                    <SelectItem value="fan-installation">Fan Installation</SelectItem>
                                  </>
                                )}
                                {form.watch("serviceCategory") === "carpentry" && (
                                  <>
                                    <SelectItem value="furniture-repair">Furniture Repair</SelectItem>
                                    <SelectItem value="door-installation">Door Installation</SelectItem>
                                    <SelectItem value="shelving">Shelving</SelectItem>
                                    <SelectItem value="deck-repair">Deck Repair</SelectItem>
                                  </>
                                )}
                                {/* Add more service-specific options as needed */}
                                <SelectItem value="other">Other (Please Specify)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your issue or service needs..."
                                className="resize-none"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Date & Time Selection */}
                  <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                      <CalendarIcon className="text-primary mr-2" />
                      Select Date & Time
                    </h3>
                    
                    <div className="space-y-5">
                      <FormItem className="flex flex-col">
                        <FormLabel>Select Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !bookingDate && "text-muted-foreground"
                                )}
                              >
                                {bookingDate ? (
                                  format(bookingDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={bookingDate}
                              onSelect={setBookingDate}
                              disabled={(date) => 
                                date < new Date() || 
                                date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant="outline"
                              className={cn(
                                "py-2 text-sm",
                                bookingTime === time && "border-primary bg-primary-light/20"
                              )}
                              onClick={() => setBookingTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                        {form.formState.errors.time && (
                          <p className="text-sm font-medium text-destructive mt-2">
                            {form.formState.errors.time.message}
                          </p>
                        )}
                      </FormItem>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                      <User className="text-primary mr-2" />
                      Your Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Service address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        variant="secondary" 
                        className="w-full mt-6"
                        disabled={bookingMutation.isPending}
                      >
                        {bookingMutation.isPending ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Check className="mr-2 h-4 w-4" />
                            Confirm Booking
                          </span>
                        )}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        By confirming, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
