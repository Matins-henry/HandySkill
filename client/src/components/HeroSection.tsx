import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Star, Wrench, Clock, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-20 flex flex-col items-center md:items-start">
        {/* Highlight Banner */}
        <motion.div 
          className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-4 h-4 mr-2" fill="white" /> 
          Trusted by over 5,000+ homeowners in the area!
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white text-center md:text-left max-w-3xl leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Professional Handyman Services For Your Home
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-100 text-center md:text-left max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Reliable, skilled, and trusted professionals for all your repair and maintenance needs. 
          One call fixes it all.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/booking">
            <Button 
              variant="secondary" 
              className="px-8 py-6 text-base rounded-md shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Service Now
            </Button>
          </Link>
          
          <Link href="/services">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-100 text-dark border-white px-8 py-6 text-base rounded-md shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              size="lg"
            >
              <Wrench className="mr-2 h-5 w-5" />
              Explore Our Services
            </Button>
          </Link>
        </motion.div>

        {/* Trust Points */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Fast Response</p>
              <p className="text-gray-200 text-xs">Same-day service available</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">100% Guaranteed</p>
              <p className="text-gray-200 text-xs">Satisfaction or money back</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center">
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">24/7 Support</p>
              <p className="text-gray-200 text-xs">Emergency service available</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
          alt="Handyman working" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile Call-to-Action */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary z-50 py-3 px-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Need help now?</p>
            <p className="text-white/80 text-sm">Professional service awaits</p>
          </div>
          <Link href="/booking">
            <Button 
              variant="secondary" 
              className="whitespace-nowrap"
              size="sm"
            >
              Book Now <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
