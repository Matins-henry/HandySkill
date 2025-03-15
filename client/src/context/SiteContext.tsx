import { createContext, useState, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Service, type TeamMember } from "@shared/schema";

// Define the context type
interface SiteContextType {
  // Global site data
  siteInfo: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  
  // Service-related state
  services: Service[] | undefined;
  isLoadingServices: boolean;
  popularServices: Service[] | undefined;
  newServices: Service[] | undefined;
  
  // Team-related state
  teamMembers: TeamMember[] | undefined;
  isLoadingTeamMembers: boolean;
  
  // Site state management
  headerScrolled: boolean;
  setHeaderScrolled: (scrolled: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  closeMobileMenu: () => void;
}

// Create the context
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// Provider component
export const SiteContextProvider = ({ children }: { children: ReactNode }) => {
  // Site information
  const siteInfo = {
    name: "HandyFix",
    tagline: "Professional Handyman Services",
    phone: "(555) 123-4567",
    email: "info@handyfix.com",
    address: "123 Repair Street, Fixitville, CA 90210",
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-3pm"
  };
  
  // UI state
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  // Fetch services
  const { 
    data: services, 
    isLoading: isLoadingServices 
  } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // Fetch team members
  const { 
    data: teamMembers, 
    isLoading: isLoadingTeamMembers 
  } = useQuery({
    queryKey: ["/api/team-members"],
  });
  
  // Derive popular and new services
  const popularServices = services?.filter((service: Service) => service.isPopular);
  const newServices = services?.filter((service: Service) => service.isNew);
  
  // Create context value
  const value: SiteContextType = {
    siteInfo,
    services,
    isLoadingServices,
    popularServices,
    newServices,
    teamMembers,
    isLoadingTeamMembers,
    headerScrolled,
    setHeaderScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    closeMobileMenu
  };
  
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

// Custom hook to use the site context
export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSiteContext must be used within a SiteContextProvider");
  }
  return context;
};
