import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema, 
  insertBookingSchema, 
  insertReviewSchema, 
  insertContactMessageSchema,
  insertUserSchema,
  extendedInsertUserSchema,
  insertServiceProviderSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import session from "express-session";
import MemoryStore from "memorystore";

// Define a session type for TypeScript
declare module "express-session" {
  interface SessionData {
    userId?: number;
    userType?: string;
    username?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";
  
  // Set up session middleware
  const MemorySessionStore = MemoryStore(session);
  app.use(
    session({
      cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: process.env.NODE_ENV === "production"
      },
      store: new MemorySessionStore({
        checkPeriod: 86400000 // Prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "handyfix-secret-key",
      resave: false,
      saveUninitialized: false
    })
  );
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
      return next();
    }
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  };

  // Middleware to check if user is a specific type
  const checkUserType = (type: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.session.userType === type) {
        return next();
      }
      return res.status(403).json({ error: "Access denied" });
    };
  };

  // Error handler middleware
  const handleZodError = (err: unknown, res: Response) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ error: validationError.message });
    }
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  };

  // Services endpoints
  app.get(`${apiPrefix}/services`, async (_req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (err) {
      console.error("Error fetching services:", err);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get(`${apiPrefix}/services/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
      
      const service = await storage.getServiceById(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      res.json(service);
    } catch (err) {
      console.error("Error fetching service:", err);
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.get(`${apiPrefix}/services/category/:category`, async (req, res) => {
    try {
      const category = req.params.category;
      const services = await storage.getServicesByCategory(category);
      res.json(services);
    } catch (err) {
      console.error("Error fetching services by category:", err);
      res.status(500).json({ error: "Failed to fetch services by category" });
    }
  });

  app.get(`${apiPrefix}/services/popular`, async (_req, res) => {
    try {
      const popularServices = await storage.getPopularServices();
      res.json(popularServices);
    } catch (err) {
      console.error("Error fetching popular services:", err);
      res.status(500).json({ error: "Failed to fetch popular services" });
    }
  });

  app.get(`${apiPrefix}/services/new`, async (_req, res) => {
    try {
      const newServices = await storage.getNewServices();
      res.json(newServices);
    } catch (err) {
      console.error("Error fetching new services:", err);
      res.status(500).json({ error: "Failed to fetch new services" });
    }
  });

  // Bookings endpoints
  app.post(`${apiPrefix}/bookings`, async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Reviews endpoints
  app.get(`${apiPrefix}/reviews`, async (_req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.get(`${apiPrefix}/reviews/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid review ID" });
      }
      
      const review = await storage.getReviewById(id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      
      res.json(review);
    } catch (err) {
      console.error("Error fetching review:", err);
      res.status(500).json({ error: "Failed to fetch review" });
    }
  });

  app.get(`${apiPrefix}/reviews/service/:serviceId`, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      if (isNaN(serviceId)) {
        return res.status(400).json({ error: "Invalid service ID" });
      }
      
      const reviews = await storage.getReviewsByServiceId(serviceId);
      res.json(reviews);
    } catch (err) {
      console.error("Error fetching reviews by service ID:", err);
      res.status(500).json({ error: "Failed to fetch reviews by service ID" });
    }
  });

  app.post(`${apiPrefix}/reviews`, async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Team Members endpoints
  app.get(`${apiPrefix}/team-members`, async (_req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (err) {
      console.error("Error fetching team members:", err);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get(`${apiPrefix}/team-members/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid team member ID" });
      }
      
      const teamMember = await storage.getTeamMemberById(id);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      
      res.json(teamMember);
    } catch (err) {
      console.error("Error fetching team member:", err);
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  // Contact Messages endpoints
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Contact message sent successfully", id: message.id });
    } catch (err) {
      handleZodError(err, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
