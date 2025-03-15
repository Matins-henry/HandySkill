import express, { type Express, Request, Response, NextFunction } from "express";
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
  
  // Apply middleware
  app.use(express.json());
  
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

  // Authentication Routes
  // Register new user
  app.post(`${apiPrefix}/auth/register`, async (req, res) => {
    try {
      // Parse and validate the incoming data
      const userData = extendedInsertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }
      
      // Ensure passwords match
      if (userData.password !== userData.confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user with hashed password
      const newUser = await storage.createUser({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        userType: userData.userType
      });
      
      // Return success without the password
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      console.error("Error registering user:", err);
      handleZodError(err, res);
    }
  });

  // Login user
  app.post(`${apiPrefix}/auth/login`, async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      
      // Set session data
      req.session.userId = user.id;
      req.session.userType = user.userType;
      req.session.username = user.username;
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  // Logout user
  app.post(`${apiPrefix}/auth/logout`, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  // Get current user
  app.get(`${apiPrefix}/auth/me`, isAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId;
      const user = await storage.getUser(userId!);
      
      if (!user) {
        req.session.destroy(() => {});
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  
  // Service provider routes
  
  // Get service provider profile
  app.get(`${apiPrefix}/providers/profile`, isAuthenticated, checkUserType("provider"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      const provider = await storage.getServiceProviderByUserId(userId);
      
      if (!provider) {
        return res.status(404).json({ error: "Service provider profile not found" });
      }
      
      res.json(provider);
    } catch (err) {
      console.error("Error fetching provider profile:", err);
      res.status(500).json({ error: "Failed to fetch provider profile" });
    }
  });
  
  // Create service provider profile
  app.post(`${apiPrefix}/providers/profile`, isAuthenticated, checkUserType("provider"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      
      // Check if provider already has a profile
      const existingProvider = await storage.getServiceProviderByUserId(userId);
      if (existingProvider) {
        return res.status(400).json({ error: "Provider profile already exists" });
      }
      
      const provider = await storage.createServiceProvider(req.body, userId);
      res.status(201).json(provider);
    } catch (err) {
      console.error("Error creating provider profile:", err);
      handleZodError(err, res);
    }
  });
  
  // Update service provider profile
  app.patch(`${apiPrefix}/providers/profile`, isAuthenticated, checkUserType("provider"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      
      // Get provider profile
      const provider = await storage.getServiceProviderByUserId(userId);
      if (!provider) {
        return res.status(404).json({ error: "Provider profile not found" });
      }
      
      // Update profile
      const updatedProvider = await storage.updateServiceProvider(provider.id, req.body);
      res.json(updatedProvider);
    } catch (err) {
      console.error("Error updating provider profile:", err);
      handleZodError(err, res);
    }
  });
  
  // Get provider bookings
  app.get(`${apiPrefix}/providers/bookings`, isAuthenticated, checkUserType("provider"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      
      // Get provider profile
      const provider = await storage.getServiceProviderByUserId(userId);
      if (!provider) {
        return res.status(404).json({ error: "Provider profile not found" });
      }
      
      const bookings = await storage.getBookingsByProviderId(provider.id);
      res.json(bookings);
    } catch (err) {
      console.error("Error fetching provider bookings:", err);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  
  // Client routes
  
  // Get client bookings
  app.get(`${apiPrefix}/clients/bookings`, isAuthenticated, checkUserType("client"), async (req, res) => {
    try {
      const userId = req.session.userId!;
      const bookings = await storage.getBookingsByClientId(userId);
      res.json(bookings);
    } catch (err) {
      console.error("Error fetching client bookings:", err);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
