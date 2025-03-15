import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { type Service } from "@shared/schema";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Fetch all services
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // Filter services by category
  const filteredServices = services?.filter((service: Service) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "popular") return service.isPopular;
    if (activeCategory === "new") return service.isNew;
    return service.category === activeCategory;
  });

  // Get unique categories from services
  const categories = services ? 
    ["all", "popular", "new", ...new Set(services.map((service: Service) => service.category))] : 
    ["all", "popular", "new"];

  // Map category to human-readable name
  const getCategoryName = (category: string) => {
    switch (category) {
      case "all": return "All Services";
      case "popular": return "Popular";
      case "new": return "New";
      case "plumbing": return "Plumbing";
      case "electrical": return "Electrical";
      case "carpentry": return "Carpentry";
      case "painting": return "Painting";
      case "flooring": return "Flooring";
      case "maintenance": return "Maintenance";
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Services
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Browse our comprehensive range of handyman and home repair services. Quality work guaranteed.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <Filter className="text-primary mr-2" />
              <h2 className="text-xl font-heading font-semibold">Filter Services</h2>
            </div>
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto gap-2">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {getCategoryName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
                    {getCategoryName(category)} 
                    {category === "all" && " - All Categories"}
                  </h3>
                  
                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredServices && filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {filteredServices.map((service: Service, index: number) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg mb-4">No services found in this category.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveCategory("all")}
                      >
                        View All Services
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Need a Custom Service?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Don't see what you're looking for? Contact us for a custom quote tailored to your specific needs.
          </p>
          <Button variant="secondary" size="lg" className="shadow-lg" onClick={() => window.location.href = "/contact"}>
            Get a Custom Quote
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;
