import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const extractions = pgTable("extractions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  favicon: text("favicon"),
  
  // Asset data
  htmlAssets: jsonb("html_assets").$type<Array<{
    name: string;
    url: string;
    size: number;
    content?: string;
  }>>().default([]),
  
  cssAssets: jsonb("css_assets").$type<Array<{
    name: string;
    url: string;
    size: number;
    content?: string;
  }>>().default([]),
  
  jsAssets: jsonb("js_assets").$type<Array<{
    name: string;
    url: string;
    size: number;
    content?: string;
  }>>().default([]),
  
  imageAssets: jsonb("image_assets").$type<Array<{
    name: string;
    url: string;
    size: number;
    type: string;
  }>>().default([]),
  
  fontAssets: jsonb("font_assets").$type<Array<{
    name: string;
    url: string;
    size: number;
    type: string;
  }>>().default([]),
  
  // Framework detection
  frameworks: jsonb("frameworks").$type<Array<{
    name: string;
    version?: string;
    confidence: number;
    icon: string;
  }>>().default([]),
  
  // Performance metrics
  performanceScore: integer("performance_score").default(0),
  loadTime: integer("load_time").default(0),
  totalSize: integer("total_size").default(0),
  
  // Mobile responsiveness
  isMobileResponsive: boolean("is_mobile_responsive").default(false),
  hasViewportMeta: boolean("has_viewport_meta").default(false),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertExtractionSchema = createInsertSchema(extractions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const analyzeWebsiteSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertExtraction = z.infer<typeof insertExtractionSchema>;
export type Extraction = typeof extractions.$inferSelect;
export type AnalyzeWebsiteRequest = z.infer<typeof analyzeWebsiteSchema>;
