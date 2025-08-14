import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeWebsiteSchema, insertExtractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze website endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { url } = analyzeWebsiteSchema.parse(req.body);
      
      // Simulate website analysis (in production, this would use Puppeteer or similar)
      const analysisResult = await analyzeWebsite(url);
      
      // Store the extraction in database
      const extraction = await storage.createExtraction(analysisResult);
      
      res.json({ success: true, data: extraction });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to analyze website" 
        });
      }
    }
  });

  // Get recent extractions
  app.get("/api/extractions", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const extractions = await storage.getRecentExtractions(limit);
      res.json({ success: true, data: extractions });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch extractions" 
      });
    }
  });

  // Get single extraction
  app.get("/api/extractions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const extraction = await storage.getExtraction(id);
      
      if (!extraction) {
        res.status(404).json({ 
          success: false, 
          message: "Extraction not found" 
        });
        return;
      }
      
      res.json({ success: true, data: extraction });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch extraction" 
      });
    }
  });

  // Delete extraction
  app.delete("/api/extractions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteExtraction(id);
      
      if (!deleted) {
        res.status(404).json({ 
          success: false, 
          message: "Extraction not found" 
        });
        return;
      }
      
      res.json({ success: true, message: "Extraction deleted" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete extraction" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Mock website analysis function
async function analyzeWebsite(url: string) {
  // In production, this would use Puppeteer, Cheerio, and other tools
  // For now, we'll return structured mock data based on the URL
  
  const domain = new URL(url).hostname;
  
  return {
    url,
    title: `Website Analysis - ${domain}`,
    description: `Comprehensive analysis of ${domain}`,
    favicon: `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    
    htmlAssets: [
      { name: "index.html", url: `${url}/index.html`, size: 12543 },
      { name: "about.html", url: `${url}/about.html`, size: 8932 },
      { name: "contact.html", url: `${url}/contact.html`, size: 6754 },
    ],
    
    cssAssets: [
      { name: "main.css", url: `${url}/assets/main.css`, size: 45678 },
      { name: "tailwind.css", url: `${url}/assets/tailwind.css`, size: 123456 },
      { name: "components.css", url: `${url}/assets/components.css`, size: 23456 },
    ],
    
    jsAssets: [
      { name: "app.js", url: `${url}/assets/app.js`, size: 87654 },
      { name: "components.js", url: `${url}/assets/components.js`, size: 34567 },
      { name: "utils.js", url: `${url}/assets/utils.js`, size: 12345 },
    ],
    
    imageAssets: [
      { name: "logo.svg", url: `${url}/assets/logo.svg`, size: 3456, type: "image/svg+xml" },
      { name: "hero-bg.jpg", url: `${url}/assets/hero-bg.jpg`, size: 234567, type: "image/jpeg" },
      { name: "icon-sprite.png", url: `${url}/assets/icon-sprite.png`, size: 45678, type: "image/png" },
    ],
    
    fontAssets: [
      { name: "inter-regular.woff2", url: `${url}/assets/fonts/inter-regular.woff2`, size: 23456, type: "font/woff2" },
      { name: "inter-bold.woff2", url: `${url}/assets/fonts/inter-bold.woff2`, size: 25678, type: "font/woff2" },
      { name: "roboto-mono.woff2", url: `${url}/assets/fonts/roboto-mono.woff2`, size: 28901, type: "font/woff2" },
    ],
    
    frameworks: [
      { name: "React", version: "18.2.0", confidence: 95, icon: "fab fa-react" },
      { name: "Tailwind CSS", version: "3.3.0", confidence: 90, icon: "fas fa-paint-brush" },
      { name: "Vite", version: "4.4.0", confidence: 85, icon: "fab fa-js-square" },
    ],
    
    performanceScore: Math.floor(Math.random() * 30) + 70, // 70-100
    loadTime: Math.floor(Math.random() * 2000) + 500, // 500-2500ms
    totalSize: 456789,
    
    isMobileResponsive: Math.random() > 0.3,
    hasViewportMeta: Math.random() > 0.2,
  };
}
