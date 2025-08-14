import { extractions, type Extraction, type InsertExtraction, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Extraction methods
  createExtraction(extraction: InsertExtraction): Promise<Extraction>;
  getExtraction(id: string): Promise<Extraction | undefined>;
  getRecentExtractions(limit?: number): Promise<Extraction[]>;
  deleteExtraction(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(extractions).where(eq(extractions.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Mock implementation since we don't have user authentication yet
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    return user;
  }

  async createExtraction(extraction: InsertExtraction): Promise<Extraction> {
    const [created] = await db
      .insert(extractions)
      .values(extraction)
      .returning();
    return created;
  }

  async getExtraction(id: string): Promise<Extraction | undefined> {
    const [extraction] = await db
      .select()
      .from(extractions)
      .where(eq(extractions.id, id));
    return extraction || undefined;
  }

  async getRecentExtractions(limit: number = 10): Promise<Extraction[]> {
    return await db
      .select()
      .from(extractions)
      .orderBy(desc(extractions.createdAt))
      .limit(limit);
  }

  async deleteExtraction(id: string): Promise<boolean> {
    const result = await db
      .delete(extractions)
      .where(eq(extractions.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
