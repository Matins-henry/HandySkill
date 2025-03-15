import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Services Table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
  isNew: boolean("is_new").default(false),
  iconName: text("icon_name").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ 
  id: true 
});

// Bookings Table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  serviceCategory: text("service_category").notNull(),
  specificService: text("specific_service"),
  description: text("description"),
  date: text("date").notNull(),
  time: text("time").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true
});

// Reviews Table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  serviceId: integer("service_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  avatarUrl: text("avatar_url"),
  date: timestamp("date").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  date: true
});

// Team Members Table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  rating: varchar("rating", { length: 3 }).notNull(),
  skills: text("skills").array(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true
});

// Contact Messages Table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceInterest: text("service_interest"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
