import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Book Now", path: "/booking" },
    { name: "Reviews", path: "/reviews" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const serviceLinks = [
    { name: "Plumbing Services", path: "/services#plumbing" },
    { name: "Electrical Work", path: "/services#electrical" },
    { name: "Carpentry & Woodwork", path: "/services#carpentry" },
    { name: "Painting Services", path: "/services#painting" },
    { name: "Flooring Installation", path: "/services#flooring" },
    { name: "Home Maintenance", path: "/services#maintenance" }
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Information */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-2">
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
              <span className="text-xl font-heading font-bold">HandyFix</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Your trusted partner for professional handyman and home repair services. 
              Quality workmanship guaranteed.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for tips, special offers, and updates.
            </p>
            
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 rounded-r-none bg-gray-800 border-gray-700 text-white"
              />
              <Button variant="primary" className="rounded-l-none">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HandyFix. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
