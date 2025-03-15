import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Book Now", path: "/booking" },
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-white transition-shadow duration-300",
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-dark rounded-md flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 10C27.91 10 10 27.91 10 50C10 72.09 27.91 90 50 90C72.09 90 90 72.09 90 50C90 27.91 72.09 10 50 10Z" fill="#40E0D0"/>
              <path d="M70 40L60 50L70 60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 40L30 50L40 60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M60 30L40 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-heading font-bold text-dark">HandyFix</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path}
              className={cn(
                "text-gray-700 hover:text-primary transition-colors duration-200 font-medium",
                location === item.path && "text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 hover:text-primary p-2 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Book Now Button (Desktop) */}
        <Link href="/booking" className="hidden md:block">
          <Button variant="secondary" className="px-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 mr-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
            Book Now
          </Button>
        </Link>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden bg-white border-t border-gray-200 transition-all duration-300",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path} 
              onClick={closeMobileMenu}
              className={cn(
                "py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium",
                location === item.path && "text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/booking" onClick={closeMobileMenu}>
            <Button variant="secondary" className="w-full justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 mr-2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M8 14h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 18h.01"></path>
                <path d="M12 18h.01"></path>
                <path d="M16 18h.01"></path>
              </svg>
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
