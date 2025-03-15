import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Calendar, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HandyFixLogo } from "@/lib/icons";

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
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-dark text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>Mon-Fri: 8am - 6pm, Sat: 9am - 4pm</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <span className="sr-only">Facebook</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <span className="sr-only">Instagram</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled ? "shadow-md py-2" : "py-4"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={cn(
              "flex items-center justify-center rounded-md transition-all duration-300 bg-gradient-to-br from-primary to-secondary",
              isScrolled ? "w-9 h-9" : "w-10 h-10"
            )}>
              <HandyFixLogo className={cn(
                "text-white transition-all duration-300",
                isScrolled ? "h-5 w-5" : "h-6 w-6"
              )} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-heading font-bold text-dark transition-all duration-200",
                isScrolled ? "text-lg" : "text-xl"
              )}>
                HandyFix
              </span>
              {!isScrolled && (
                <span className="text-xs text-gray-500 -mt-1">Professional Handyman Services</span>
              )}
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                className={cn(
                  "text-gray-700 hover:text-primary transition-colors duration-200 font-medium relative group",
                  location === item.path && "text-primary font-semibold"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  location === item.path ? "w-full" : "w-0"
                )}></span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Phone Number (Desktop) */}
            <a href="tel:(555)123-4567" className="hidden lg:flex items-center text-gray-700 hover:text-primary transition-colors duration-200">
              <div className="bg-primary/10 rounded-full p-2 mr-2">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-gray-500">Call Us</span>
                <p className="text-sm font-medium">(555) 123-4567</p>
              </div>
            </a>
            
            {/* Book Now Button */}
            <Link href="/booking" className="hidden md:block">
              <Button variant="secondary" size="sm" className={cn(
                "shadow-sm transition-all duration-300",
                isScrolled ? "px-4 py-1" : "px-5 py-2"
              )}>
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
            
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 hover:text-primary p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden bg-white border-t border-gray-200 transition-all duration-300 absolute w-full",
            mobileMenuOpen ? "max-h-96 opacity-100 shadow-lg" : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col divide-y divide-gray-100">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path} 
                onClick={closeMobileMenu}
                className={cn(
                  "py-3 px-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium flex justify-between items-center",
                  location === item.path && "text-primary"
                )}
              >
                <span>{item.name}</span>
                {location === item.path && (
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                )}
              </Link>
            ))}
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-3" />
                <a href="tel:(555)123-4567" className="text-gray-700 font-medium">
                  (555) 123-4567
                </a>
              </div>
              <Link href="/booking" onClick={closeMobileMenu}>
                <Button variant="secondary" className="w-full justify-center shadow-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
