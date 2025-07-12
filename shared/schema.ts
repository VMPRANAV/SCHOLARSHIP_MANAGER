import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scholarships = pgTable("scholarships", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  organizationLogo: text("organization_logo"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  educationLevel: text("education_level").notNull(),
  applicationEndDate: text("application_end_date").notNull(),
  description: text("description").notNull(),
  eligibility: text("eligibility").notNull(),
  community: text("community"),
  genderRequirement: text("gender_requirement"),
  applicationLink: text("application_link"),
  applicationFormPath: text("application_form_path"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
  createdAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export type InsertScholarship = z.infer<typeof insertScholarshipSchema>;
export type Scholarship = typeof scholarships.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
