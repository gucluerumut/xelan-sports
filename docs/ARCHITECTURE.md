# Xelan Sports Architecture

## Overview

Xelan Sports is a Next.js 16 application that tracks and displays social media metrics for football teams across 5 major European leagues.

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Database:** Firebase Firestore
- **Styling:** Tailwind CSS + Framer Motion
- **Language:** TypeScript
- **Deployment:** Firebase Hosting

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Rankings   │  │   Compare    │  │   Planner    │      │
│  │     Page     │  │     Page     │  │     Page     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┴──────────────────┘               │
│                            │                                  │
│                  ┌─────────▼─────────┐                       │
│                  │  Firestore Client │                       │
│                  │   (lib/teams-     │                       │
│                  │    firestore.ts)  │                       │
│                  └─────────┬─────────┘                       │
└────────────────────────────┼─────────────────────────────────┘
                             │
                   ┌─────────▼─────────┐
                   │   Firebase        │
                   │   Firestore       │
                   │   (Cloud)         │
                   └─────────┬─────────┘
                             │
                   ┌─────────▼─────────┐
                   │  GitHub Actions   │
                   │  Scraper Workflow │
                   │  (Weekly Updates) │
                   └───────────────────┘
```

## Data Flow

### 1. Data Collection
```
GitHub Actions (Weekly)
  └─> Python Scraper
      └─> Instagram/Twitter/TikTok APIs
          └─> Firestore Update
```

### 2. Data Display
```
User Request
  └─> Next.js Page
      └─> Firestore Client
          └─> Real-time Data
              └─> React Components
```

### 3. Admin Updates
```
Admin Panel
  └─> Firestore Client
      └─> Direct Database Update
          └─> Immediate UI Refresh
```

## Database Schema

### Firestore Collection: `teams`

```typescript
{
  id: string;              // Unique team identifier
  name: string;            // Team name
  country: string;         // Country
  league: string;          // League name
  logo: string;            // Logo URL
  socials: {
    instagram: {
      username: string;
      followers: number;
    };
    twitter: {
      username: string;
      followers: number;
    };
    tiktok: {
      username: string;
      followers: number;
    };
  };
  totalFollowers: number;  // Sum of all platforms
  updatedAt: Timestamp;    // Last update time
}
```

## Component Architecture

### Core Components

```
components/
├── ErrorBoundary.tsx          # Error handling wrapper
├── Navbar.tsx                 # Navigation
├── RankingsTableFirestore.tsx # Main rankings display
├── TeamSelectorFirestore.tsx  # Team selection dropdown
├── ComparisonView.tsx         # Team comparison
└── skeletons/
    └── Skeletons.tsx          # Loading states
```

### Pages

```
app/
├── (protected)/
│   ├── rankings/page.tsx      # Rankings page
│   ├── compare/page.tsx       # Comparison page
│   ├── planner/page.tsx       # Content planner
│   └── admin/page.tsx         # Admin panel
└── page.tsx                   # Home page
```

## State Management

- **Local State:** React useState for component-level state
- **Server State:** Firestore real-time listeners
- **Error State:** ErrorBoundary components
- **Loading State:** Skeleton components

## Performance Optimizations

### 1. Build Optimizations
- Turbopack for faster builds
- Static page generation
- Image optimization

### 2. Runtime Optimizations
- Skeleton loading states
- Error boundaries
- Retry logic with exponential backoff

### 3. Data Optimizations
- Firestore indexes
- Client-side caching (future: React Query)
- Optimistic updates

## Deployment Pipeline

```
Local Development
  └─> npm run dev
      └─> Test locally

Production Build
  └─> npm run build
      └─> Static export
          └─> Firebase deploy
              └─> Live site
```

## Security

- Firebase Security Rules for Firestore
- Environment variables for secrets
- Client-side validation
- Server-side authentication (admin panel)

## Monitoring & Logging

- Error boundaries catch runtime errors
- Console logging for development
- Future: External error tracking (Sentry)

## Future Enhancements

1. **Caching Layer:** React Query for data caching
2. **Analytics:** User behavior tracking
3. **Real-time Updates:** WebSocket connections
4. **Mobile App:** React Native version
5. **AI Insights:** OpenAI integration for predictions
