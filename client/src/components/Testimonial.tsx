import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";
import { type Review } from "@shared/schema";

interface TestimonialProps {
  review: Review;
  index: number;
}

const Testimonial = ({ review, index }: TestimonialProps) => {
  // Generate star rating based on review.rating
  const renderStarRating = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-secondary text-sm fill-current" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-secondary text-sm fill-current" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-secondary text-sm" />);
    }
    
    return stars;
  };
  
  // Format date to relative time (e.g. "2 weeks ago")
  const getRelativeTimeString = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 7) {
      return diffInDays === 0 ? "Today" : diffInDays === 1 ? "Yesterday" : `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  };

  return (
    <motion.div 
      className="bg-gray-50 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={review.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=40E0D0&color=fff`}
          alt={review.name} 
          className="h-12 w-12 rounded-full object-cover border-2 border-primary"
        />
        <div className="ml-3">
          <h4 className="font-heading font-semibold">{review.name}</h4>
          <div className="flex">
            {renderStarRating()}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 mb-3">
        "{review.comment}"
      </p>
      
      <div className="flex items-center text-gray-500 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{getRelativeTimeString(new Date(review.date))}</span>
      </div>
    </motion.div>
  );
};

export default Testimonial;
