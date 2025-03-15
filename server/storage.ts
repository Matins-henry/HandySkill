import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  bookings, type Booking, type InsertBooking,
  reviews, type Review, type InsertReview,
  teamMembers, type TeamMember, type InsertTeamMember,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service methods
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getPopularServices(): Promise<Service[]>;
  getNewServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;

  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Review methods
  getReviews(): Promise<Review[]>;
  getReviewById(id: number): Promise<Review | undefined>;
  getReviewsByServiceId(serviceId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Team Member methods
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;

  // Contact Message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  private teamMembers: Map<number, TeamMember>;
  private contactMessages: Map<number, ContactMessage>;

  private currentUserId: number;
  private currentServiceId: number;
  private currentBookingId: number;
  private currentReviewId: number;
  private currentTeamMemberId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    this.teamMembers = new Map();
    this.contactMessages = new Map();

    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentBookingId = 1;
    this.currentReviewId = 1;
    this.currentTeamMemberId = 1;
    this.currentContactMessageId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category
    );
  }

  async getPopularServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.isPopular
    );
  }

  async getNewServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.isNew
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const createdAt = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt };
    this.bookings.set(id, booking);
    return booking;
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewsByServiceId(serviceId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.serviceId === serviceId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const date = new Date();
    const review: Review = { ...insertReview, id, date };
    this.reviews.set(id, review);
    return review;
  }

  // Team Member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamMemberId++;
    const teamMember: TeamMember = { ...insertTeamMember, id };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }

  // Contact Message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }

  // Initialize with sample data
  private initSampleData() {
    // Sample services
    const sampleServices: InsertService[] = [
      {
        name: "Plumbing Services",
        description: "Professional solutions for leaks, installations, repairs, and all your plumbing needs.",
        category: "plumbing",
        price: "Starting at $85",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
        isPopular: true,
        isNew: false,
        iconName: "Droplet"
      },
      {
        name: "Electrical Services",
        description: "Safe and reliable electrical installations, repairs, and upgrades for your home.",
        category: "electrical",
        price: "Starting at $95",
        imageUrl: "https://images.unsplash.com/photo-1558618666-c3cdc56be44a?q=80&w=600&auto=format&fit=crop",
        isPopular: false,
        isNew: false,
        iconName: "ZapIcon"
      },
      {
        name: "Carpentry Services",
        description: "Custom woodworking, furniture repairs, and structural carpentry for your home.",
        category: "carpentry",
        price: "Starting at $90",
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop",
        isPopular: false,
        isNew: true,
        iconName: "Hammer"
      },
      {
        name: "Painting Services",
        description: "Interior and exterior painting services with premium paints and professional finish.",
        category: "painting",
        price: "Starting at $75/room",
        imageUrl: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=600&auto=format&fit=crop",
        isPopular: false,
        isNew: false,
        iconName: "Paintbrush"
      },
      {
        name: "Flooring Services",
        description: "Installation and repair of hardwood, laminate, tile, and vinyl flooring with expert precision.",
        category: "flooring",
        price: "Starting at $8/sq ft",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
        isPopular: false,
        isNew: false,
        iconName: "LayoutBottom"
      },
      {
        name: "Home Maintenance",
        description: "General maintenance, repairs, and seasonal home check-ups to keep everything running smoothly.",
        category: "maintenance",
        price: "Starting at $120",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
        isPopular: true,
        isNew: false,
        iconName: "Settings"
      }
    ];

    sampleServices.forEach(service => {
      this.createService(service);
    });

    // Sample reviews
    const sampleReviews: InsertReview[] = [
      {
        name: "Rebecca Stevens",
        serviceId: 1,
        rating: 5,
        comment: "Mike did an outstanding job fixing our leaky bathroom faucet. He was punctual, professional, and explained everything clearly. Highly recommend!",
        avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      {
        name: "James Wilson",
        serviceId: 2,
        rating: 4,
        comment: "Great job on our electrical panel upgrade. The team was knowledgeable and completed the work faster than expected. Will use again!",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Sarah Johnson",
        serviceId: 4,
        rating: 5,
        comment: "The team did an excellent job painting our living room. They were careful with our furniture and the finish is perfect. So happy with the results!",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ];

    sampleReviews.forEach(review => {
      this.createReview(review);
    });

    // Sample team members
    const sampleTeamMembers: InsertTeamMember[] = [
      {
        name: "Mike Anderson",
        title: "Master Plumber",
        description: "15+ years of experience specializing in residential plumbing repairs and installations.",
        imageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: "4.8",
        skills: ["Fixture Installation", "Leak Repair"]
      },
      {
        name: "Jennifer Martinez",
        title: "Electrical Specialist",
        description: "10+ years of experience with electrical systems, wiring, and smart home installations.",
        imageUrl: "https://randomuser.me/api/portraits/women/39.jpg",
        rating: "5.0",
        skills: ["Panel Upgrades", "Lighting"]
      },
      {
        name: "Robert Davis",
        title: "Carpentry Expert",
        description: "20+ years crafting custom woodwork, cabinetry, and structural carpentry solutions.",
        imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: "4.6",
        skills: ["Custom Woodwork", "Framing"]
      },
      {
        name: "Sarah Wilson",
        title: "Painting Specialist",
        description: "12+ years delivering flawless interior and exterior painting with attention to detail.",
        imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: "4.7",
        skills: ["Interior Design", "Color Matching"]
      }
    ];

    sampleTeamMembers.forEach(member => {
      this.createTeamMember(member);
    });
  }
}

export const storage = new MemStorage();
