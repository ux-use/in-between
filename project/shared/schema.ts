import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const extractions = pgTable("extractions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  title: text("title"),
  assets: jsonb("assets").$type<{
    html: Array<{ name: string; path: string; size: number; content?: string }>;
    css: Array<{ name: string; path: string; size: number; content?: string }>;
    js: Array<{ name: string; path: string; size: number; content?: string }>;
    images: Array<{ name: string; path: string; size: number; url: string }>;
    fonts: Array<{ name: string; path: string; size: number; url: string }>;
  }>(),
  frameworks: jsonb("frameworks").$type<Array<{ name: string; version?: string; detected: boolean }>>(),
  performance: jsonb("performance").$type<{
    score: number;
    totalSize: number;
    mobileResponsive: boolean;
    componentsFound: number;
  }>(),
  previewUrl: text("preview_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertExtractionSchema = createInsertSchema(extractions).omit({
  id: true,
  createdAt: true,
});

export type InsertExtraction = z.infer<typeof insertExtractionSchema>;
export type Extraction = typeof extractions.$inferSelect;
