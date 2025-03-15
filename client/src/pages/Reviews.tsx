import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import Testimonial from "@/components/Testimonial";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertReviewSchema } from "@shared/schema";

// Extend the review schema with validation
const reviewFormSchema = insertReviewSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  serviceId: z.number(),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const { toast } = useToast();
  
  // Fetch all reviews
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["/api/reviews"],
  });
  
  // Fetch services for service selection
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // Calculate average rating from reviews
  const averageRating = reviews?.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
  
  // Initialize form with default values
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      serviceId: 0,
      rating: 0,
      comment: "",
      avatarUrl: "",
    },
  });
  
  // Handle rating selection
  const handleRatingChange = (value: number) => {
    setSelectedRating(value);
    form.setValue("rating", value);
  };
  
  // Submit review mutation
  const reviewMutation = useMutation({
    mutationFn: async (data: ReviewFormValues) => {
      return apiRequest('POST', '/api/reviews', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your feedback with us.",
        variant: "success",
      });
      form.reset();
      setSelectedRating(0);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  const onSubmit = (data: ReviewFormValues) => {
    // Generate a random avatar if not provided
    const formattedData = {
      ...data,
      avatarUrl: data.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=40E0D0&color=fff`,
    };
    
    // Submit the review
    reviewMutation.mutate(formattedData);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Customer Reviews
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            See what our customers are saying about our professional handyman services.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center text-2xl">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${
                    i < Math.floor(parseFloat(averageRating))
                      ? "text-secondary fill-current"
                      : i < Math.ceil(parseFloat(averageRating))
                      ? "text-secondary fill-current"
                      : "text-secondary"
                  }`}
                />
              ))}
            </div>
            <div className="ml-3">
              <span className="text-2xl font-bold text-white">{averageRating}</span>
              <span className="text-gray-300 ml-1">out of 5</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          
          {isLoadingReviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : reviews?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews.map((review, index) => (
                <Testimonial key={review.id} review={review} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No reviews found. Be the first to leave a review!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Leave a Review Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-heading font-semibold mb-4 text-center">
              Leave Your Review
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Share your experience with our services and help us improve.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
                <div className="mb-6 text-center">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center block">Your Rating</FormLabel>
                        <div className="flex items-center justify-center space-x-1 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className="text-2xl focus:outline-none"
                              onClick={() => handleRatingChange(rating)}
                            >
                              <Star 
                                className={`${
                                  rating <= selectedRating 
                                    ? "text-secondary fill-current" 
                                    : "text-gray-300 hover:text-secondary"
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Used</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingServices ? (
                              <SelectItem value="0" disabled>Loading...</SelectItem>
                            ) : (
                              services?.map((service) => (
                                <SelectItem key={service.id} value={service.id.toString()}>
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
                </div>
                
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your experience..." 
                          className="resize-none" 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-center mt-6">
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={reviewMutation.isPending}
                  >
                    {reviewMutation.isPending ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : "Submit Review"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
