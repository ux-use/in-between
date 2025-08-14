import { type Extraction, type InsertExtraction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getExtraction(id: string): Promise<Extraction | undefined>;
  getExtractionByUrl(url: string): Promise<Extraction | undefined>;
  createExtraction(extraction: InsertExtraction): Promise<Extraction>;
  getRecentExtractions(limit?: number): Promise<Extraction[]>;
  deleteExtraction(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private extractions: Map<string, Extraction>;

  constructor() {
    this.extractions = new Map();
  }

  async getExtraction(id: string): Promise<Extraction | undefined> {
    return this.extractions.get(id);
  }

  async getExtractionByUrl(url: string): Promise<Extraction | undefined> {
    return Array.from(this.extractions.values()).find(
      (extraction) => extraction.url === url,
    );
  }

  async createExtraction(insertExtraction: InsertExtraction): Promise<Extraction> {
    const id = randomUUID();
    const extraction: Extraction = { 
      ...insertExtraction,
      title: insertExtraction.title || null,
      id,
      createdAt: new Date()
    };
    this.extractions.set(id, extraction);
    return extraction;
  }

  async getRecentExtractions(limit: number = 10): Promise<Extraction[]> {
    return Array.from(this.extractions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async deleteExtraction(id: string): Promise<void> {
    this.extractions.delete(id);
  }
}

export const storage = new MemStorage();
