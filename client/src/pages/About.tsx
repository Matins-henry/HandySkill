import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamMemberCard from "@/components/TeamMember";

const About = () => {
  // Fetch team members
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ["/api/team-members"],
  });

  const aboutFeatures = [
    "Licensed, bonded, and insured professionals",
    "Transparent pricing with no hidden fees",
    "90-day warranty on all workmanship",
    "Background-checked and vetted technicians",
    "On-time service or we'll offer a discount",
    "Eco-friendly options for most services"
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Learn about our company, our values, and the professional team behind our quality services.
          </p>
        </div>
      </section>
      
      {/* About Content */}
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
              
              <p className="text-gray-600 mb-6">
                Our team consists of certified professionals with years of experience in various trades, 
                including plumbing, electrical work, carpentry, painting, and general home maintenance. 
                We take pride in our craftsmanship and attention to detail, ensuring that every job is 
                done right the first time.
              </p>
              
              <div className="space-y-4 mb-8">
                {aboutFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center mt-1 mr-3">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/contact">
                <Button variant="secondary">
                  Contact Our Team
                </Button>
              </Link>
            </div>
            
            {/* About Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=800&auto=format&fit=crop" 
                alt="Our Team" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-5 md:p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">12+</div>
                  <p className="text-gray-700 font-medium">Years Experience</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 bg-white p-5 md:p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">5K+</div>
                  <p className="text-gray-700 font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Company Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Quality & Reliability</h3>
              <p className="text-gray-600">
                We deliver exceptional craftsmanship and stand behind our work with solid guarantees.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Promptness & Efficiency</h3>
              <p className="text-gray-600">
                We respect your time with punctual arrivals and efficient completion of projects.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Communication & Transparency</h3>
              <p className="text-gray-600">
                We keep you informed throughout the process with clear explanations and upfront pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-2">
              <Users className="inline-block mr-1" size={16} />
              Our Professionals
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our professionals bring years of experience and craftsmanship to every project.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teamMembers?.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            "To provide homeowners with reliable, high-quality repair and maintenance services that 
            enhance the comfort, safety, and value of their homes, delivered by skilled professionals 
            who take pride in their craftsmanship."
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
