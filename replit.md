# UniHub Simple - Student Portal Application

## Overview

UniHub Simple is a Next.js-based student and teacher portal application with a separate Express backend for API services. The application provides dashboards for both students and teachers with features like course management, attendance tracking, and scheduling.

## Recent Changes (October 27, 2025)

- **Student Dashboard Redesign**: Completely redesigned student dashboard with modern dark theme
  - Implemented dark navy blue theme (#0A0E27 background, #1A1F3A cards)
  - Added comprehensive header with search bar, notifications, theme toggle, and user profile
  - Created purple gradient welcome card with personalized greeting
  - Built stats cards section displaying CGPA, Attendance, Fee Status, and Achievements
  - Designed colorful gradient course cards (blue, pink, green) with progress tracking
  - Implemented attendance visualization with circular progress and horizontal subject bars
  - Added right sidebar with upcoming deadlines and class schedule sections
  - Included quick links section for common actions
- **Vercel to Replit Migration**: Successfully migrated the project from Vercel to Replit
  - Removed static export configuration (`output: 'export'`) from next.config.ts to enable dynamic hosting
  - Configured Next.js dev server to bind to 0.0.0.0:5000 for Replit compatibility
  - Configured Express backend to bind to 0.0.0.0:3001 for proper networking
  - Updated package.json scripts to use correct port bindings
  - Removed nodemon in favor of direct node execution for backend
  - Set up workflow to run both frontend and backend concurrently
  - Created missing UI components (button, avatar, dropdown-menu, sidebar, toast) in src/components/ui/ to resolve build errors
  - Installed Python 3.11 and Pillow for image processing tasks

## Project Architecture

### Frontend (Next.js 15.5.5)

- **Port**: 5000
- **Location**: Root directory with src/app structure
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS with custom components
- **Key Features**:
  - Student dashboard with courses, grades, and schedule
  - Teacher dashboard with AI lesson planner and assignments
  - Login system with role-based access (student/teacher)

### Backend (Express)

- **Port**: 3001
- **Location**: backend/server.js
- **Features**:
  - Mock authentication endpoints
  - Student and teacher data APIs
  - Schedule and notices endpoints
  - CORS enabled for frontend communication

### Technology Stack

- **Frontend**: React 18, Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express, CORS, dotenv
- **Database**: PostgreSQL (pg client installed, not yet configured)
- **UI Components**: Custom components with shadcn/ui patterns
- **State Management**: React hooks

## Running the Application

The application uses a single workflow that runs both frontend and backend:

- Command: `npm run app`
- This executes: `concurrently "npm run backend" "npm run dev"`
- Frontend available at: Port 5000
- Backend API available at: Port 3001

## Environment Variables

- `BACKEND_PORT`: Backend server port (defaults to 3001)
- Database configuration not yet set up

## Project Structure

```
/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities and mock data
├── backend/
│   └── server.js      # Express API server
├── docs/
│   └── blueprint.md   # Project documentation
├── next.config.ts     # Next.js configuration
├── package.json       # Dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

## Security Notes

- Currently using mock authentication (accepts any credentials)
- Client/server separation maintained with separate ports
- CORS configured for cross-origin requests
- Production deployment will require proper authentication implementation
