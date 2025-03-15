import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Service } from "@shared/schema";
import { getServiceIcon } from "@/lib/icons";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = getServiceIcon(service.iconName);

  return (
    <motion.div 
      className="group bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-200 overflow-hidden transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 z-10"></div>
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {service.isPopular && (
          <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary text-white z-20">
            Popular
          </Badge>
        )}
        
        {service.isNew && (
          <Badge variant="secondary" className="absolute top-4 left-4 z-20">
            New
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Icon className="w-6 h-6 mr-3 text-primary" />
          <h3 className="text-xl font-heading font-semibold">{service.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-dark">{service.price}</span>
          </span>
          
          <Link href={`/booking?service=${service.id}`}>
            <span className="text-primary hover:text-primary-dark font-medium flex items-center transition-colors duration-200">
              Book Service
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
