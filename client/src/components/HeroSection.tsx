import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Tool } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/50 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-20 flex flex-col items-center md:items-start">
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
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/booking">
            <Button 
              variant="secondary" 
              className="px-8 py-6 text-base rounded-md shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Service
            </Button>
          </Link>
          
          <Link href="/services">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-100 text-dark border-white px-8 py-6 text-base rounded-md shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <Tool className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
          </Link>
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
    </section>
  );
};

export default HeroSection;
