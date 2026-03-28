# Blogy AI SEO Engine - Documentation

## Overview
Blogy is a professional AI-powered SEO engine designed to transform keywords into high-ranking blog posts. It provides a full-stack solution with a React frontend, Node.js backend, and a modern design system tailored for Indian startups and SMEs.

## Core Features

### 1. Landing Page (Home)
- **Hero Section**: Modern, high-impact headline with a clear Call-To-Action (CTA).
- **Features Grid**: Highlights AI generation, keyword intelligence, and SEO optimization.
- **Statistics**: Showcases performance metrics (2 min generation time, 80%+ SEO score).

### 2. Live Generation Demo
- Users can enter a keyword (e.g., "AI in Healthcare").
- **Pipeline Simulation**: Shows real-time progress through SERP analysis, content structuring, and AI writing.
- **Results View**: Displays the generated blog post, SEO scores, and keyword analysis.

### 3. SEO Audit Dashboard
- **Content Analysis**: Users can paste a URL or text for an instant SEO check.
- **Scoring**: Provides specific scores for SEO, Readability, and Keyword Density.
- **Issue Tracking**: Identifies critical issues (missing meta tags, long paragraphs).
- **AI Suggestions**: Offers actionable tips to improve ranking.

### 4. Blog Management (My Blogs)
- A dashboard to view all previously generated content.
- Status indicators (Draft/Published) and SEO scores for each post.
- Search and filter functionality (simulated).

### 5. AI Generation Pipeline
- A visual representation of the complex steps Blogy takes to ensure high-quality, SEO-ready content.

### 6. Pricing Plans
- Three-tier pricing (Starter, Pro, Enterprise) to cater to different business scales.

## Architecture

### Frontend (React + Vite)
- **Routing**: `react-router-dom` for seamless page transitions.
- **Styling**: Premium Vanilla CSS with glassmorphism, gradients, and custom animations.
- **icons**: `lucide-react` for a modern, professional look.
- **API**: `axios` for communicating with the backend services.

### Backend (Node.js + Express)
- **API Endpoints**:
  - `GET /api/blogs`: Fetches the list of all blogs.
  - `POST /api/generate`: Handles the creation of new blog content from keywords.
  - `POST /api/audit`: Performs content analysis and returns SEO metrics.
- **Data Layer**: In-memory storage (initialized with mock data) for simulation purposes.

## How It Works
1. **Input**: The user provides a keyword or a blog URL.
2. **Analysis**: The backend processes the input, simulating complex LLM workflows and SEO auditing rules.
3. **Refinement**: Results are enriched with meta-data like SEO scores and keywords.
4. **Presentation**: The frontend renders these insights using high-end UI components and visualizations.

## Getting Started
1. Run `npm install` in both `frontend` and `backend` folders.
2. Start the backend: `cd backend && npm start`
3. Start the frontend: `cd frontend && npm run dev`
4. Access the app at `http://localhost:3000`
