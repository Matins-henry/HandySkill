import { 
  Wrench, 
  Droplet, 
  ZapIcon, 
  Hammer, 
  Paintbrush, 
  LayoutGrid, 
  Settings, 
  Lightbulb, 
  Construction, 
  Home, 
  Brush, 
  Ruler, 
  PencilRuler, 
  Fan, 
  Plug, 
  CircuitBoard, 
  PaintBucket, 
  Wallpaper, 
  Bot, 
  LucideIcon 
} from "lucide-react";

/**
 * Gets an icon component based on the provided icon name
 * @param iconName The name of the icon to retrieve
 * @returns A Lucide icon component
 */
export function getServiceIcon(iconName: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    // Default icons
    Default: Wrench,
    Wrench: Wrench,
    
    // Plumbing related
    Droplet: Droplet,
    Plumbing: Droplet,
    
    // Electrical related
    ZapIcon: ZapIcon,
    Zap: ZapIcon,
    Electrical: ZapIcon,
    Lightbulb: Lightbulb,
    Fan: Fan,
    Plug: Plug,
    CircuitBoard: CircuitBoard,
    
    // Carpentry related
    Hammer: Hammer,
    Carpentry: Hammer,
    Construction: Construction,
    PencilRuler: PencilRuler,
    Ruler: Ruler,
    
    // Painting related
    Paintbrush: Paintbrush,
    Painting: Paintbrush,
    Brush: Brush,
    PaintBucket: PaintBucket,
    Wallpaper: Wallpaper,
    
    // Flooring related
    LayoutGrid: LayoutGrid,
    Flooring: LayoutGrid,
    
    // Maintenance related
    Settings: Settings,
    Maintenance: Settings,
    Home: Home,
    Bot: Bot,
  };
  
  return icons[iconName] || Wrench;
}

/**
 * Gets a service icon by category
 * @param category The service category
 * @returns A Lucide icon component
 */
export function getIconByCategory(category: string): LucideIcon {
  const categoryIcons: Record<string, LucideIcon> = {
    plumbing: Droplet,
    electrical: ZapIcon,
    carpentry: Hammer,
    painting: Paintbrush,
    flooring: LayoutGrid,
    maintenance: Settings,
    default: Wrench
  };
  
  return categoryIcons[category] || categoryIcons.default;
}

/**
 * Returns an SVG for the HandyFix logo
 */
export function HandyFixLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M50 10C27.91 10 10 27.91 10 50C10 72.09 27.91 90 50 90C72.09 90 90 72.09 90 50C90 27.91 72.09 10 50 10Z" fill="#40E0D0"/>
      <path d="M70 40L60 50L70 60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 40L30 50L40 60" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 30L40 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
