# Scholarship Display and Management System

## Overview

This is a full-stack web application for displaying, managing, and applying for scholarships. The system provides a user-friendly interface for students to browse scholarships and an admin panel for managing scholarship listings. Built with modern web technologies including React, Express, and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI
- **Styling**: Tailwind CSS with custom education-themed colors
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **File Uploads**: Multer middleware for handling logo and PDF uploads
- **Development**: Development server with hot reload and request logging

### Data Storage Solutions
- **Database**: MongoDB with automatic fallback to in-memory storage
- **Schema**: Defined in shared/schema.ts with MongoDB-compatible interface
- **Connection**: Automatic fallback system - tries MongoDB first, falls back to in-memory storage
- **Development Storage**: In-memory storage for development/testing (current fallback mode)
- **File Storage**: Local filesystem for uploaded files (logos and application forms)
- **Database Interface**: IDatabase interface supports both MongoDB and in-memory implementations

## Key Components

### Database Schema
Two main entities:
- **Scholarships**: Contains scholarship details including name, amount, eligibility, deadlines, and file attachments
- **Admin Users**: Basic authentication system for admin access

### Frontend Pages
- **Home Page**: Public scholarship browsing with search and filtering
- **Admin Page**: Protected admin interface for scholarship management
- **Not Found**: 404 error page

### Core Features
- **Scholarship Display**: Card-based layout with detailed modal views
- **Search & Filtering**: By education level, status, and text search
- **File Management**: Logo uploads and PDF application forms
- **Admin Dashboard**: CRUD operations for scholarship management
- **KPR Programs**: Special scholarship programs with downloadable forms

## Data Flow

1. **Public Access**: Users browse scholarships through the home page
2. **Search/Filter**: Real-time filtering updates scholarship listings
3. **Detailed View**: Modal displays comprehensive scholarship information
4. **Admin Access**: Login-protected admin panel for content management
5. **File Handling**: Uploaded files served through Express static middleware
6. **API Communication**: Frontend uses TanStack Query for API calls with error handling

## External Dependencies

### UI/UX Libraries
- Radix UI primitives for accessible components
- Lucide React for icons
- Tailwind CSS for styling
- Class Variance Authority for component variants

### Data Management
- TanStack Query for API state management
- React Hook Form for form handling
- Zod for schema validation
- Date-fns for date formatting

### Backend Infrastructure
- MongoDB for persistent data storage (with automatic fallback)
- Multer for file upload handling
- Express session management
- Automatic database connection management

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation via tsx
- In-memory storage for rapid development
- File uploads stored locally

### Production Build
- Vite builds optimized frontend bundle
- ESBuild compiles backend TypeScript to ESM
- Static files served by Express
- MongoDB database connection (with in-memory fallback for development)
- Environment variables: MONGODB_URI, MONGODB_DB_NAME (optional)

### Environment Configuration
- Development: Uses in-memory storage with automatic fallback
- Production: Optional MONGODB_URI for MongoDB connection
- File uploads: Configurable upload directory (defaults to ./uploads)
- Session management: Express session handling
- Database: Automatic detection and fallback system ensures reliability

The application follows a monorepo structure with shared schema definitions between frontend and backend, ensuring type safety across the full stack. The architecture supports both development convenience and production scalability.