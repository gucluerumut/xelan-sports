# ⚽ Xelan Sports - Social Media Rankings

Track and compare social media performance of football teams across 5 major European leagues.

**Live Site:** [https://xelansports.web.app](https://xelansports.web.app)

---

## 🚀 Features

- **Real-time Rankings:** Track Instagram, Twitter, and TikTok followers for 96 teams
- **5 Major Leagues:** Premier League, La Liga, Serie A, Ligue 1, Süper Lig
- **Team Comparison:** Head-to-head social media performance analysis
- **Content Planner:** Plan and track social media content
- **Admin Panel:** Edit team data and manage content
- **Automated Updates:** Weekly scraper updates follower counts

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Database:** Firebase Firestore
- **Styling:** Tailwind CSS + Framer Motion
- **Language:** TypeScript
- **Deployment:** Firebase Hosting
- **CI/CD:** GitHub Actions

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gucluerumut/xelan-sports.git
   cd xelan-sports
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` file:
   ```env
   FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```
   
   See [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) for full configuration.

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
xelan-sports/
├── app/                      # Next.js app router pages
│   ├── (protected)/         # Protected routes
│   │   ├── rankings/        # Rankings page
│   │   ├── compare/         # Comparison page
│   │   ├── planner/         # Content planner
│   │   └── admin/           # Admin panel
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ErrorBoundary.tsx    # Error handling
│   ├── RankingsTableFirestore.tsx
│   ├── TeamSelectorFirestore.tsx
│   └── skeletons/           # Loading states
├── lib/                     # Utilities
│   ├── teams-firestore.ts   # Firestore client
│   ├── retry.ts             # Retry logic
│   └── utils.ts             # Helpers
├── scripts/                 # Python scripts
│   ├── seed_all_teams.py    # Data seeding
│   └── scrape_multi_platform.py  # Scraper
└── docs/                    # Documentation
    ├── ARCHITECTURE.md      # System architecture
    └── ENVIRONMENT.md       # Environment setup
```

---

## 🔥 Key Features

### 1. Real-time Data
- Firestore integration for live updates
- Automatic scraper runs weekly via GitHub Actions
- Admin panel for manual updates

### 2. Performance
- Build time: 294ms page generation
- Skeleton loading states
- Error boundaries for graceful failures
- Retry logic with exponential backoff

### 3. User Experience
- Responsive design
- Smooth animations with Framer Motion
- Professional loading states
- Error handling

---

## 📊 Data

### Teams
- **96 teams** across 5 leagues
- **Social platforms:** Instagram, Twitter, TikTok
- **Auto-updated:** Weekly via GitHub Actions

### Leagues
- Premier League (20 teams)
- La Liga (20 teams)
- Serie A (20 teams)
- Ligue 1 (18 teams)
- Süper Lig (18 teams)

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase
```bash
npx firebase-tools deploy --only hosting
```

### Automated Deployment
- Push to `main` branch triggers automatic deployment
- GitHub Actions runs tests and deploys

---

## 📖 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Environment Setup](docs/ENVIRONMENT.md) - Configuration guide
- [Walkthrough](/.gemini/antigravity/brain/2d5f5cf0-9697-47af-8784-3c4ba8c0d671/walkthrough.md) - Development progress

---

## 🛠️ Scripts

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
```

### Data Management
```bash
python scripts/seed_all_teams.py           # Seed teams to Firestore
python scripts/backup_firestore.py         # Backup Firestore data
python scripts/scrape_multi_platform.py    # Run scraper manually
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is private and proprietary.

---

## 🔗 Links

- **Live Site:** [https://xelansports.web.app](https://xelansports.web.app)
- **GitHub:** [https://github.com/gucluerumut/xelan-sports](https://github.com/gucluerumut/xelan-sports)
- **Firebase Console:** [https://console.firebase.google.com/project/xelansports](https://console.firebase.google.com/project/xelansports)

---

**Built with ❤️ using Next.js 16 and Firebase**
