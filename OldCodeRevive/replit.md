# Overview

WebScrape Pro is a full-stack web application that analyzes websites and extracts their frontend assets. The application allows users to input website URLs and performs comprehensive analysis including asset detection, framework identification, performance scoring, and mobile responsiveness testing. Users can download extracted assets and view live previews of analyzed websites.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast hot module replacement
- **Tailwind CSS** for utility-first styling with custom design system variables
- **shadcn/ui** component library built on Radix UI primitives for consistent, accessible components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management, caching, and API interactions

## Backend Architecture
- **Express.js** server with TypeScript for RESTful API endpoints
- **Drizzle ORM** configured for PostgreSQL with schema definitions and migrations
- **In-memory storage** fallback with DatabaseStorage class for data persistence
- **Modular route handling** with centralized error handling middleware
- **Development/production environment detection** with conditional Vite integration

## Database Schema
The application uses PostgreSQL with Drizzle ORM:
- **Users table** with basic authentication fields
- **Extractions table** storing comprehensive website analysis results
- **JSONB fields** for complex data structures (assets, frameworks, performance metrics)
- **Zod validation** schemas for type safety and runtime validation

## API Design
RESTful API structure with standardized responses:
- **POST /api/analyze** - Main endpoint for website analysis
- **GET /api/extractions** - Retrieve recent extractions with pagination
- **GET /api/extractions/:id** - Get single extraction by ID
- **DELETE /api/extractions/:id** - Remove extraction record
- **Consistent error handling** with JSON responses and proper HTTP status codes

## Component Structure
Modular component architecture following separation of concerns:
- **Page components** for routing (home, not-found)
- **Feature components** organized by functionality (analyzer, downloads, dashboard)
- **UI components** following shadcn/ui patterns for consistency
- **Custom hooks** for mobile detection and toast notifications

## Data Flow
- User inputs URL through URLAnalyzer component
- Backend performs website analysis (currently mocked)
- Results stored in database and returned to frontend
- AnalysisResults component displays live preview and metrics
- AssetDownloadCenter organizes extracted files by type
- RecentExtractions dashboard shows analysis history

# External Dependencies

## Frontend Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility and functionality
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **wouter**: Lightweight routing library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel component functionality

## Backend Dependencies
- **@neondatabase/serverless**: Neon database driver for PostgreSQL
- **drizzle-orm**: Type-safe database ORM
- **drizzle-kit**: Database migration and schema management
- **connect-pg-simple**: PostgreSQL session store for Express
- **express**: Web application framework
- **zod**: Runtime type validation

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Tailwind
- **@replit/vite-plugin-***: Replit-specific development enhancements