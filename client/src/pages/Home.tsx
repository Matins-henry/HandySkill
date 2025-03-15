import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, List, Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";
import TeamMemberCard from "@/components/TeamMember";

const Home = () => {
  // Fetch services
  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ["/api/services"],
  });

  // Fetch reviews
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["/api/reviews"],
  });

  // Fetch team members
  const { data: teamMembers, isLoading: isLoadingTeamMembers } = useQuery({
    queryKey: ["/api/team-members"],
  });

  // Calculate average rating from reviews
  const averageRating = reviews?.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Our Professional Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of handyman and home repair services to keep your home in perfect condition.
            </p>
          </div>

          {/* Services Grid */}
          {isLoadingServices ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services?.slice(0, 6)?.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}

          {/* View All Services Button */}
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="primary" className="px-8 py-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <List className="mr-2 h-5 w-5" />
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Customer Reviews
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
                <span className="text-2xl font-bold text-dark">{averageRating}</span>
                <span className="text-gray-600 ml-1">out of 5</span>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          {isLoadingReviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews?.slice(0, 3)?.map((review, index) => (
                <Testimonial key={review.id} review={review} index={index} />
              ))}
            </div>
          )}

          {/* View All Reviews Button */}
          <div className="mt-10 text-center">
            <Link href="/reviews">
              <span className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                Read All Reviews
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section (Preview) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div>
              <span className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-2">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
                Your Trusted Home Repair Experts
              </h2>

              <p className="text-gray-600 mb-6">
                Founded in 2010, HandyFix has become synonymous with quality, reliability, and expertise 
                in the home repair industry. We started with a simple mission: to provide homeowners with 
                trustworthy, skilled professionals for all their repair and maintenance needs.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Licensed, bonded, and insured professionals</p>
                </div>
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center mt-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Transparent pricing with no hidden fees</p>
                </div>
              </div>

              <Link href="/about">
                <Button variant="secondary">
                  Learn More About Us
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Team Preview */}
            <div>
              <h3 className="text-2xl font-heading font-bold text-dark mb-4">Our Expert Team</h3>
              <p className="text-gray-600 mb-6">
                Meet some of our professionals who bring years of experience to every project.
              </p>

              {isLoadingTeamMembers ? (
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teamMembers?.slice(0, 2)?.map((member, index) => (
                    <TeamMemberCard key={member.id} member={member} index={index} />
                  ))}
                </div>
              )}

              <div className="mt-6 text-center sm:text-left">
                <Link href="/about#team">
                  <span className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-200">
                    Meet Our Full Team
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book our professional handyman services today and experience quality craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/booking">
              <Button variant="secondary" size="lg" className="shadow-lg w-full sm:w-auto">
                Book a Service
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
