# Overview

WebScrape Pro is a full-stack web application that analyzes websites and extracts their frontend assets. The application allows users to input website URLs and performs comprehensive analysis including asset detection (HTML, CSS, JavaScript, images, fonts), framework identification, performance scoring, and mobile responsiveness checks. The extracted data is stored and displayed through an intuitive dashboard interface with live preview capabilities and export functionality.

# User Preferences

Preferred communication style: Answer with "0_0" and provide minimal explanations, focus on code only.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast hot module replacement
- **Tailwind CSS** for utility-first styling with custom design system variables
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible components
- **Wouter** for lightweight client-side routing with dual mode navigation (WebScrape/Coder)
- **TanStack Query** for server state management, caching, and API interactions

## Backend Architecture
- **Express.js** server with TypeScript for RESTful API endpoints (port 5000)
- **Go backend** for code preview functionality (port 8081)
- **In-memory storage** (MemStorage class) as the current data persistence layer
- **Drizzle ORM** configured for PostgreSQL with schema definitions and migrations
- **Modular route handling** with centralized error handling middleware
- **Development/production environment detection** with conditional Vite integration

## Component Structure
The frontend follows a modular component architecture:
- **Page components** for routing (`home.tsx`, `not-found.tsx`)
- **Feature components** for specific functionality (asset detection, framework detection, live preview)
- **UI components** following shadcn/ui patterns for consistency
- **Custom hooks** for mobile detection and toast notifications

## Data Schema
The application uses a PostgreSQL schema with:
- **Extractions table** storing website analysis results
- **JSONB fields** for complex data structures (assets, frameworks, performance metrics)
- **Zod validation** schemas for type safety and runtime validation
- **Drizzle ORM** for type-safe database operations

## API Design
RESTful API structure with:
- **POST /api/analyze** - Main endpoint for website analysis (currently mock implementation)
- **GET /api/extractions** - Retrieve recent extractions
- **Standardized error handling** with consistent JSON responses
- **Request/response logging** middleware for debugging

## Styling System
- **CSS custom properties** for theming with light/dark mode support
- **Tailwind configuration** extended with custom colors, fonts, and design tokens
- **Component variants** using class-variance-authority for consistent styling patterns
- **Responsive design** with mobile-first approach

## Development Workflow
- **TypeScript** for type safety across the entire application
- **ESM modules** with modern JavaScript features
- **Hot module replacement** in development with Vite
- **Path aliases** for clean imports (@/, @shared/, @assets/)

# External Dependencies

## Database
- **PostgreSQL** - Primary database configured through Drizzle ORM
- **Neon Database** - Serverless PostgreSQL provider (@neondatabase/serverless)

## UI Framework
- **Radix UI** - Unstyled, accessible UI primitives for all interactive components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icon sets (Simple Icons for brand logos)

## Development Tools
- **Vite** - Build tool and development server
- **TypeScript** - Type checking and development experience
- **PostCSS** - CSS processing with Tailwind and Autoprefixer
- **ESBuild** - Fast JavaScript bundler for production builds

## Planned Integrations
- **Puppeteer** - Web scraping and browser automation (mentioned in comments)
- **Cheerio** - Server-side HTML parsing and manipulation
- **Framework Detection** - Automated identification of React, Vue, Angular, Tailwind, Bootstrap

## State Management
- **TanStack Query** - Server state management and caching
- **React Context** - Local component state for UI components
- **Wouter** - Client-side routing state

## Form Handling
- **React Hook Form** - Form state management and validation
- **Hookform Resolvers** - Integration with validation libraries
- **Zod** - Schema validation for forms and API data

The application is designed to be scalable with a clear separation between frontend and backend concerns, using modern web development practices and tools for maintainability and developer experience.