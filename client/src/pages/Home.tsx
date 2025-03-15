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

      {/* Service Categories Section */}
      <section id="service-categories" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Our Service Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in a wide range of professional handyman services to solve all your home repair needs
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Plumbing */}
            <Link href="/services#plumbing" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Plumbing</h3>
                <p className="text-sm text-gray-500">Leak repairs, installations & more</p>
              </div>
            </Link>

            {/* Electrical */}
            <Link href="/services#electrical" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Electrical</h3>
                <p className="text-sm text-gray-500">Outlets, lighting & panel repairs</p>
              </div>
            </Link>

            {/* Carpentry */}
            <Link href="/services#carpentry" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Carpentry</h3>
                <p className="text-sm text-gray-500">Furniture, cabinets & woodwork</p>
              </div>
            </Link>

            {/* Painting */}
            <Link href="/services#painting" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Painting</h3>
                <p className="text-sm text-gray-500">Interior & exterior painting</p>
              </div>
            </Link>

            {/* Flooring */}
            <Link href="/services#flooring" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Flooring</h3>
                <p className="text-sm text-gray-500">Tile, hardwood & laminate</p>
              </div>
            </Link>

            {/* Maintenance */}
            <Link href="/services#maintenance" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-light/40 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold mb-2">Maintenance</h3>
                <p className="text-sm text-gray-500">Regular home maintenance</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
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
