# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your Firebase credentials to .env.local

# Seed data (first time only)
python scripts/seed_all_teams.py

# Start development server
npm run dev
```

## Project Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
```

### Data Management
```bash
# Seed all teams to Firestore
python scripts/seed_all_teams.py

# Backup Firestore data
python scripts/backup_firestore.py

# Run scraper manually
python scripts/scrape_multi_platform.py
```

### Deployment
```bash
# Build and deploy to Firebase
npm run build
npx firebase-tools deploy --only hosting
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# ... code ...

# Test locally
npm run dev

# Build test
npm run build

# Commit
git add .
git commit -m "feat: your feature description"

# Push
git push origin feature/your-feature
```

### 2. Component Development

**Pattern:**
```tsx
// components/YourComponent.tsx
"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { YourSkeleton } from "@/components/skeletons/Skeletons";

export default function YourComponent() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data
    }, []);

    if (loading) return <YourSkeleton />;

    return (
        <ErrorBoundary>
            {/* Your component */}
        </ErrorBoundary>
    );
}
```

### 3. Firestore Integration

```typescript
import { getAllTeams } from "@/lib/teams-firestore";
import { retryWithBackoff } from "@/lib/retry";

// Fetch with retry
const teams = await retryWithBackoff(
    () => getAllTeams(),
    { maxAttempts: 3 }
);
```

## Code Style

### TypeScript
- Use strict mode
- Add JSDoc comments for complex functions
- Prefer interfaces over types
- Use meaningful variable names

### React
- Functional components only
- Use hooks (useState, useEffect, etc.)
- Implement error boundaries
- Add loading states

### CSS
- Use Tailwind CSS utilities
- Follow existing patterns
- Ensure responsive design
- Use Framer Motion for animations

## Testing Checklist

Before committing:
- [ ] Code builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Responsive design works
- [ ] Loading states implemented
- [ ] Error handling added

## Common Tasks

### Adding a New Page
1. Create page in `app/(protected)/your-page/page.tsx`
2. Add navigation link in `components/Navbar.tsx`
3. Test routing
4. Add to documentation

### Adding a New Component
1. Create component in `components/YourComponent.tsx`
2. Add loading skeleton if needed
3. Wrap with ErrorBoundary
4. Export from component
5. Document usage

### Updating Team Data
1. Edit in Admin Panel (UI), or
2. Update Firestore directly, or
3. Run seed script: `python scripts/seed_all_teams.py`

### Running Scraper
```bash
# Manual run
python scripts/scrape_multi_platform.py

# Automatic (GitHub Actions)
# Runs weekly on schedule
```

## Debugging

### Common Issues

**Build fails:**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Firestore connection error:**
- Check `.env.local` credentials
- Verify Firebase project ID
- Check Firestore rules

**Data not loading:**
- Check browser console
- Verify Firestore has data
- Check network tab

## Performance Tips

1. **Use skeleton loading** instead of spinners
2. **Implement error boundaries** for critical components
3. **Add retry logic** for network requests
4. **Optimize images** with Next.js Image component
5. **Use React.memo** for expensive components

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Help

1. Check existing documentation
2. Search closed issues
3. Open new issue with details
4. Ask in discussions

---

**Happy coding! 🚀**
