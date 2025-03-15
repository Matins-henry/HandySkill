import { Star, StarHalf } from "lucide-react";
import { type TeamMember } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => {
  // Generate star rating based on member.rating
  const renderStarRating = () => {
    const stars = [];
    const rating = parseFloat(member.rating);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
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
    
    return (
      <div className="flex">
        {stars}
        <span className="text-sm text-gray-600 ml-1">{member.rating}</span>
      </div>
    );
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={member.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=40E0D0&color=fff&size=256`}
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <h4 className="font-heading font-semibold text-lg">{member.name}</h4>
        <p className="text-primary font-medium mb-2">{member.title}</p>
        
        <div className="flex mb-3">
          {renderStarRating()}
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{member.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill, skillIndex) => (
            <Badge key={skillIndex} variant="outline" className="bg-gray-100 text-xs text-gray-700 font-normal">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
