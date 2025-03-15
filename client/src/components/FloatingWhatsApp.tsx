import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

const FloatingWhatsApp = ({ phoneNumber }: FloatingWhatsAppProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("Hello! I'm interested in your handyman services.");
  
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const closePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  };
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  // Format phone number for WhatsApp URL
  const formattedPhone = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup */}
      <div 
        className={cn(
          "bg-white rounded-lg shadow-lg mb-4 w-72 overflow-hidden transition-all duration-300",
          isExpanded ? "opacity-100 scale-100 mb-4" : "opacity-0 scale-90 mb-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-green-500 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-3">
              <svg viewBox="0 0 32 32" className="w-5 h-5 text-green-500 fill-current">
                <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-.143-.73-.43-.201-.610-.475-1.290-.76-1.917-.157-.345-.324-.487-.518-.487-.132 0-.273-.043-.405-.043-.132 0-.262.043-.38.043-.517 0-.949.28-1.261.59-.744.74-.859 1.866-.859 2.919 0 1.751.157 3.642 1.959 5.544 2.356 2.487 5.107 3.513 8.315 3.513 1.062 0 2.844-.67 2.844-1.826 0-.689-1.181-2.638-1.677-2.638M16.064 3c-7.18 0-12.99 5.81-12.99 12.99 0 2.265.578 4.43 1.679 6.387L3.13 28.225a.996.996 0 0 0 .237 1.079c.26.26.668.382 1.027.237l5.848-1.618A12.945 12.945 0 0 0 16.063 29c7.18 0 12.992-5.808 12.992-12.99 0-7.177-5.812-12.99-12.992-12.99"/>
              </svg>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm">HandyFix Support</h5>
              <p className="text-green-100 text-xs">Typically replies within an hour</p>
            </div>
          </div>
          <button 
            onClick={closePopup}
            className="text-white hover:text-green-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 bg-green-50">
          <p className="text-sm text-gray-600 mb-2">Hi there! 👋</p>
          <p className="text-sm text-gray-600 mb-4">
            Need help with handyman services? Chat with us directly on WhatsApp.
          </p>
          
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mb-3 resize-none h-24"
          />
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md p-2 w-full font-medium text-sm transition-colors duration-300"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 mr-2 fill-current">
              <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-.143-.73-.43-.201-.610-.475-1.290-.76-1.917-.157-.345-.324-.487-.518-.487-.132 0-.273-.043-.405-.043-.132 0-.262.043-.38.043-.517 0-.949.28-1.261.59-.744.74-.859 1.866-.859 2.919 0 1.751.157 3.642 1.959 5.544 2.356 2.487 5.107 3.513 8.315 3.513 1.062 0 2.844-.67 2.844-1.826 0-.689-1.181-2.638-1.677-2.638M16.064 3c-7.18 0-12.99 5.81-12.99 12.99 0 2.265.578 4.43 1.679 6.387L3.13 28.225a.996.996 0 0 0 .237 1.079c.26.26.668.382 1.027.237l5.848-1.618A12.945 12.945 0 0 0 16.063 29c7.18 0 12.992-5.808 12.992-12.99 0-7.177-5.812-12.99-12.992-12.99"/>
            </svg>
            Start Chat
          </a>
        </div>
      </div>
      
      {/* Floating Button */}
      <button
        onClick={toggleExpanded}
        className={cn(
          "bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg",
          "transition-all duration-300 hover:shadow-xl relative",
          isExpanded ? "w-14 h-14" : "w-16 h-16"
        )}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse animation when not expanded */}
        {!isExpanded && (
          <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-75"></span>
        )}
        
        <svg viewBox="0 0 32 32" className={cn("fill-current", isExpanded ? "w-6 h-6" : "w-8 h-8")}>
          <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-.143-.73-.43-.201-.610-.475-1.290-.76-1.917-.157-.345-.324-.487-.518-.487-.132 0-.273-.043-.405-.043-.132 0-.262.043-.38.043-.517 0-.949.28-1.261.59-.744.74-.859 1.866-.859 2.919 0 1.751.157 3.642 1.959 5.544 2.356 2.487 5.107 3.513 8.315 3.513 1.062 0 2.844-.67 2.844-1.826 0-.689-1.181-2.638-1.677-2.638M16.064 3c-7.18 0-12.99 5.81-12.99 12.99 0 2.265.578 4.43 1.679 6.387L3.13 28.225a.996.996 0 0 0 .237 1.079c.26.26.668.382 1.027.237l5.848-1.618A12.945 12.945 0 0 0 16.063 29c7.18 0 12.992-5.808 12.992-12.99 0-7.177-5.812-12.99-12.992-12.99"/>
        </svg>
      </button>
      
      {/* Small indicator text */}
      {!isExpanded && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
          1
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsApp;
