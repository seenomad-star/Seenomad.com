# Seenomad — Next-Gen Nomad Intelligence & Social OS ✈️🌍

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State-orange.svg)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Seenomad** is a comprehensive, production-grade intelligence platform and social ecosystem designed specifically for digital nomads, remote founders, and location-independent travelers.

It bridges the gap between static city-ranking directories (like Nomad List) and living traveler communities by combining:
1. **Live Social Nexus**: Verified stories, reels, bounty boards, local meetups, and real-time city chatter.
2. **Nomad Intelligence Engine**: 195+ countries indexed with verified fiber speeds, cost-of-living breakdowns, neighborhood safety, and embassy data.
3. **Personal Compliance & Mobility Tracking**: Built-in rolling Schengen 90/180-day monitor and 183-day tax residency tracking.
4. **Gamified Identity & NMD Economy**: Daily Nomad Drops, streak multipliers, persistent credit ledgers, verified passport stamps, and XP progression.
5. **AI Travel Copilots**: Multi-agent assistants for visa compliance, auto-itinerary planning, and local spot recommendations.
6. **Mobile-First Ergonomics**: Glassmorphic bottom navigation dock, dynamic breadcrumbs, quick launch half-sheet, touch-optimized sidebars, and circular scroll-depth floating action buttons.

---

## 🏛️ System Architecture

Seenomad follows a domain-driven, **Feature-First Architecture** inside a modern monorepo workspace:

```
seenomad/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/                 # Static assets, PWA manifest, favicons
│   ├── src/
│   │   ├── components/         # Shared global UI components
│   │   │   ├── common/         # Atomic reusable components (Breadcrumbs, BottomNav, ScrollToTop, Toast)
│   │   │   └── layout/         # Shell infrastructure (Sidebar, NavbarV3, MobileDrawer, AddressBar)
│   │   ├── features/           # Domain-driven feature modules
│   │   │   ├── SocialFeed/     # Community feed, composer, live pulse
│   │   │   ├── Explore/        # 195+ countries, destination hubs, speed maps
│   │   │   ├── Visa/           # Visa intelligence, Schengen 90/180 tracker, tax residency
│   │   │   ├── AIAgents/       # Nomad AI copilots, concierge chat
│   │   │   ├── Community/      # Meetups, story studio, guardian connect
│   │   │   ├── TravelGames/    # Quests, country checklists, dopamine challenges
│   │   │   ├── Growth/         # Daily Nomad Drop, retention streak, perks
│   │   │   ├── Wallet/         # NMD tokens, crypto exchange, NFT passport
│   │   │   └── UserHub/        # Profile, achievements, travel DNA
│   │   ├── layouts/            # BaseLayout, MainLayout shells
│   │   ├── services/           # Centralized API client abstraction layer
│   │   ├── store/              # Zustand persistent state engines (nomadOSStore, navStore, savedStore)
│   │   ├── styles/             # Global CSS design tokens, themes, animations
│   │   └── utils/              # Calculation helpers (domain utils, date formatting)
│   ├── package.json
│   └── vite.config.js
├── metadata.json               # Platform manifest and permissions
├── package.json                # Monorepo root workspace config
└── README.md                   # Product vision, architecture & guide
```

---

## ⚡ Tech Stack & Libraries

| Layer | Technology |
|---|---|
| **Core Framework** | React 19 (`react`, `react-dom`, `react-router-dom` v7) |
| **Build & Tooling** | Vite 6.0, Node.js, Bun |
| **Styling & Design Tokens** | Tailwind CSS 4, CSS Custom Properties, Glassmorphism |
| **State Management** | Zustand with `persist` middleware (local & indexed storage) |
| **Animation & Motion** | Framer Motion (page transitions, spring action sheets, layout IDs) |
| **Icons & Visuals** | Lucide React |
| **Form & Data Utils** | Custom date algorithms, rolling 180-day window calculators |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or Bun 1.0+
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/seenomad/seenomad.git
cd seenomad
```

### 2. Install dependencies
```bash
npm install
# or with bun
bun install
```

### 3. Run development server
```bash
npm run dev
# or
bun run dev --workspace=client
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Lint codebase
```bash
npm run lint
```

---

## 🔑 Environment Variables

Create a `.env` file in the `client/` folder:

```env
# API Base Endpoint (Defaults to local proxy in dev)
VITE_API_BASE_URL=https://api.seenomad.io/v1

# Optional Analytics
VITE_ANALYTICS_KEY=
```

---

## 🌟 Feature Map & Differentiation vs Competitors

| Capability | Seenomad | Nomads.com / Nomad List | Traditional Booking Sites |
|---|---|---|---|
| **Social / Community** | Real-time Nexus feed, Flash Meetups, Bounties | Forum threads / Slack | None / Reviews only |
| **Compliance Tools** | **Rolling Schengen 90/180 Calculator & 183-day Tax Monitor** | None / Third-party links | None |
| **Gamification & Identity** | Daily Nomad Drops, persistent NMD ledger, XP & Rank progression | Badges only | Loyalty points (locked) |
| **AI Travel Copilots** | Context-aware AI agents for visas, packing & local tips | None | Basic generic chatbot |
| **Mobile Experience** | Dedicated bottom dock, touch drawer, swipe navigation, safe-area support | Desktop-adapted web view | Mobile apps only |
| **Destination Intel** | 195+ countries with live speed tests, safety & domain registration status | City rankings only | Hotel / flight inventory only |

---

## 📈 Roadmap & Prioritization

- [x] **Responsive Mobile Dock**: Bottom-aligned navigation capsule with elevated TravelOS quick action sheet.
- [x] **Dynamic Route Breadcrumbs**: Semantic Schema.org breadcrumbs with query parameters and navigation actions.
- [x] **Scroll-to-Top Floating Ring**: Threshold-aware circular progress FAB with responsive docked-sidebar avoidance.
- [x] **Persistent Daily Nomad Drop**: Real NMD credit ledger, transaction logging, and streak protection.
- [x] **Schengen 90/180 & Tax Residency Tracker**: Interactive day counter to prevent overstays and unexpected tax liabilities.
- [ ] **Full Backend & Auth Integration**: Real user authentication (OAuth + Firebase/Supabase), Postgres persistence.
- [ ] **Live Location-Based Radar**: Geolocation-powered "Nomads Nearby" with privacy fuzzing.
- [ ] **Native Mobile Builds**: Capacitor / PWA offline synchronization for flights and remote areas.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
