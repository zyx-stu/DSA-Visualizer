# Architecture — DSA Visualizer

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  React 18 + Vite  ──────────────────  Vercel CDN            │
│  Tailwind CSS + Framer Motion                                │
│  Axios (REST API calls)                                      │
└───────────────────────────┬─────────────────────────────────┘
                            │  HTTPS / JSON
┌───────────────────────────▼─────────────────────────────────┐
│                         API LAYER                            │
│  Node.js + Express  ────────────────  Render Web Service    │
│  ├── Routes         (URL → Handler mapping)                  │
│  ├── Controllers    (Business logic)                         │
│  ├── Services       (Data processing layer)                  │
│  ├── Middleware     (CORS, Rate limit, Validation, Errors)   │
│  └── Models         (Mongoose schemas)                       │
└───────────────────────────┬─────────────────────────────────┘
                            │  Mongoose ODM
┌───────────────────────────▼─────────────────────────────────┐
│                      DATABASE LAYER                          │
│  MongoDB Atlas  ────────────────────  Cloud (M0 Free)       │
│  ├── algorithms collection (indexed)                         │
│  └── analytics  collection                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

```
frontend/src/
├── components/
│   ├── algorithms/        # Card, Grid, SearchBar, FilterBar, CategoryTabs
│   ├── common/            # Navbar, Footer, Loader, ErrorBoundary
│   ├── detail/            # AlgorithmDetail, CodeBlock, ComplexityBadge, VisualizationLinks
│   └── home/              # Hero, Stats, Features
├── context/               # AlgorithmContext (global state)
├── hooks/                 # useAlgorithms, useDebounce, useSearch
├── pages/                 # Home, AlgorithmsPage, NotFound
├── services/              # api.js (Axios client)
├── styles/                # index.css (Tailwind + custom)
└── utils/                 # constants.js, helpers.js
```

**State Management:** React Context + Custom Hooks (no Redux needed at this scale)

**Routing:** React Router v6

**Animations:** Framer Motion (page transitions, card hovers, modals)

**Code Highlighting:** react-syntax-highlighter (VSCode Dark+ theme)

---

## Backend Architecture

```
backend/src/
├── config/
│   ├── database.js        # MongoDB connection
│   └── env.js             # Env variable validation
├── controllers/
│   ├── algorithmController.js
│   └── analyticsController.js
├── middleware/
│   ├── cors.js            # CORS whitelist
│   ├── errorHandler.js    # Global error handler
│   ├── rateLimiter.js     # 100 req / 15min per IP
│   └── validator.js       # express-validator rules
├── models/
│   ├── Algorithm.js       # Main schema (indexed)
│   └── Analytics.js       # Event tracking schema
├── routes/
│   ├── algorithmRoutes.js
│   ├── analyticsRoutes.js
│   └── index.js
├── seeders/
│   └── algorithmSeeder.js
├── utils/
│   ├── logger.js          # Winston logger
│   ├── response.js        # Standard response helpers
│   └── slugify.js         # URL slug generator
└── server.js
```

---

## Database Schema

### Algorithm Collection

```javascript
{
  name:        String,   // unique, indexed, text-searchable
  slug:        String,   // unique, URL-safe, auto-generated
  category:    String,   // enum, indexed
  difficulty:  String,   // enum: easy | medium | hard, indexed
  description: {
    short:     String,   // ≤ 300 chars, shown in card
    detailed:  String,   // shown in detail panel
  },
  complexity: {
    time:  { best, average, worst },
    space: String,
  },
  codeSnippets: [{ language, code }],   // python | js | cpp | java | go
  visualizations: [{ platform, url, title }],
  tags:          [String],
  prerequisites: [String],
  useCases:      [String],
  analytics: {
    views: Number,
    likes: Number,
  },
  isActive:   Boolean,
  timestamps: true,      // createdAt, updatedAt
}
```

**Indexes:**
```
{ name: 'text', 'description.short': 'text', tags: 'text' }  ← full-text search
{ category: 1, difficulty: 1 }                                ← compound filter
{ 'analytics.views': -1 }                                     ← popular sort
{ createdAt: -1 }                                             ← newest sort
```

---

## API Reference

### Algorithms

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/algorithms` | List all (paginated) | `category`, `difficulty`, `search`, `page`, `limit`, `sort` |
| GET | `/api/algorithms/:slug` | Full detail + code | — |
| GET | `/api/algorithms/stats` | Platform statistics | — |
| GET | `/api/algorithms/popular` | Top by views | `limit` |
| GET | `/api/algorithms/categories` | All categories + counts | — |
| GET | `/api/algorithms/search` | Autocomplete search | `q` |
| POST | `/api/algorithms/:slug/like` | Toggle like | body: `{ increment: true }` |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analytics/track` | Track event |
| GET | `/api/analytics/:slug` | Get algorithm analytics |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/health` | API health check |

---

## CI/CD Pipeline

```
git push origin main
        │
        ▼
GitHub Actions (.github/workflows/ci.yml)
  ├── Job 1: Backend syntax check
  ├── Job 2: Frontend production build
  └── Job 3: Deploy gate (summary)
        │
        ├──▶ Render auto-deploys backend
        └──▶ Vercel auto-deploys frontend
```

---

## Performance Decisions

| Decision | Reason |
|----------|--------|
| `lean()` on all read queries | Returns plain JS objects, ~40% faster than full Mongoose documents |
| `Promise.all()` in stats endpoint | Parallel DB queries instead of sequential |
| `select('-codeSnippets')` on listing | Code (~3KB per algo) only fetched on detail view |
| Debounced search (500ms) | Avoids API call on every keystroke |
| MongoDB text index | Server-side full-text search, no client filtering needed |
| Vercel CDN | Static assets cached globally at edge |
| 60s Axios timeout | Accounts for Render free tier cold start |

---

## Security

| Measure | Implementation |
|---------|---------------|
| Rate limiting | 100 req / 15min per IP via `express-rate-limit` |
| CORS whitelist | Only allowed origins accepted |
| Input validation | `express-validator` on all query params |
| Security headers | `X-Frame-Options`, `X-XSS-Protection` via `vercel.json` |
| Secrets management | `.env` files never committed, `.gitignore` enforced |
| Production guard | `env.js` fails fast on missing required vars |
