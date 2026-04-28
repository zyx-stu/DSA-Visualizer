# DSA Visualizer 🚀

A production-grade Data Structures & Algorithms learning platform with interactive visualizations, multi-language code, and complexity analysis.

**Live:** [Frontend → Vercel] | [API → Render]

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18 + Vite + Tailwind CSS      |
| Backend   | Node.js + Express 4                 |
| Database  | MongoDB Atlas (Mongoose)            |
| Deploy FE | Vercel                              |
| Deploy BE | Render                              |
| CI/CD     | GitHub Actions                      |

---

## Project Structure

```
DSA-Visualizer/
├── .github/
│   └── workflows/ci.yml        # GitHub Actions CI/CD
├── backend/
│   ├── src/
│   │   ├── config/             # database.js, env.js
│   │   ├── controllers/        # algorithmController.js, analyticsController.js
│   │   ├── middleware/         # cors, errorHandler, rateLimiter, validator
│   │   ├── models/             # Algorithm.js, Analytics.js
│   │   ├── routes/             # algorithmRoutes, analyticsRoutes, index
│   │   ├── seeders/            # algorithmSeeder.js
│   │   ├── services/           # (extension point)
│   │   ├── utils/              # response.js, logger.js, slugify.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── algorithms/     # Card, Grid, SearchBar, FilterBar, CategoryTabs
│   │   │   ├── common/         # Navbar, Footer, Loader, ErrorBoundary
│   │   │   ├── detail/         # AlgorithmDetail, CodeBlock, ComplexityBadge, VisualizationLinks
│   │   │   └── home/           # Hero, Stats, Features
│   │   ├── context/            # AlgorithmContext.jsx
│   │   ├── hooks/              # useAlgorithms, useDebounce, useSearch
│   │   ├── pages/              # Home, AlgorithmPage, NotFound
│   │   ├── services/           # api.js
│   │   ├── styles/             # index.css
│   │   └── utils/              # constants.js, helpers.js
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
├── render.yaml
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/DSA-Visualizer.git
cd DSA-Visualizer
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env          # fill in your MongoDB URI
npm install
npm run dev                   # starts on http://localhost:5000
```

### 3. Seed the Database

```bash
# In a new terminal, still in /backend
npm run seed
```

### 4. Setup Frontend

```bash
cd ../frontend
cp .env.example .env.local    # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                   # starts on http://localhost:5173
```

---

## 🌐 MongoDB Atlas Setup

### Step 1 — Create a Free Cluster

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up / Log in
3. Click **"Build a Database"** → choose **M0 Free Tier**
4. Select a cloud provider (AWS recommended) and region closest to you
5. Name your cluster: `dsa-visualizer`

### Step 2 — Create a Database User

1. Left sidebar → **Database Access** → **Add New Database User**
2. Authentication method: **Password**
3. Username: `dsa_admin` | Password: (generate a strong password — save it!)
4. Role: **Atlas admin** (or `readWriteAnyDatabase`)
5. Click **Add User**

### Step 3 — Whitelist Your IP

1. Left sidebar → **Network Access** → **Add IP Address**
2. For development: click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
3. For production: add your Render service IP or use `0.0.0.0/0` with Render

### Step 4 — Get Connection String

1. Left sidebar → **Database** → **Connect** → **Compass** or **Drivers**
2. Choose **Node.js** driver
3. Copy the URI — it looks like:
   ```
   mongodb+srv://dsa_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add the database name: change `/?retryWrites` → `/dsa_visualizer?retryWrites`

**Final URI:**
```
mongodb+srv://dsa_admin:YOUR_PASS@cluster0.xxxxx.mongodb.net/dsa_visualizer?retryWrites=true&w=majority
```

Put this in `backend/.env` as `MONGODB_URI=...`

---

## 🚀 Backend Deployment — Render

### Step 1 — Push to GitHub first (see GitHub section below)

### Step 2 — Create Render Account

1. Go to [https://render.com](https://render.com) and sign up with GitHub

### Step 3 — New Web Service

1. Dashboard → **New** → **Web Service**
2. Connect your GitHub repo: `DSA-Visualizer`
3. Fill in the settings:

| Field         | Value                       |
|---------------|-----------------------------|
| Name          | `dsa-visualizer-api`        |
| Root Directory| `backend`                   |
| Runtime       | `Node`                      |
| Build Command | `npm install`               |
| Start Command | `npm start`                 |
| Plan          | **Free** (or Starter)       |

### Step 4 — Add Environment Variables

In Render → your service → **Environment** tab, add:

| Key                       | Value                                   |
|---------------------------|-----------------------------------------|
| `NODE_ENV`                | `production`                            |
| `PORT`                    | `5000`                                  |
| `MONGODB_URI`             | `mongodb+srv://...` (your Atlas URI)    |
| `CORS_ORIGIN`             | `https://your-app.vercel.app`           |
| `RATE_LIMIT_WINDOW_MS`    | `900000`                                |
| `RATE_LIMIT_MAX_REQUESTS` | `100`                                   |

> ⚠️ Set `CORS_ORIGIN` to your **actual Vercel URL** — get it after Step below.

### Step 5 — Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Your API URL will be: `https://dsa-visualizer-api.onrender.com`
4. Test it: `https://dsa-visualizer-api.onrender.com/health`

### Step 6 — Seed Production Database

After deployment, open Render → your service → **Shell** tab:

```bash
npm run seed
```

---

## 🌍 Frontend Deployment — Vercel

### Step 1 — Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com) and sign up with GitHub

### Step 2 — Import Project

1. Dashboard → **Add New...** → **Project**
2. Import your `DSA-Visualizer` GitHub repo
3. Vercel will auto-detect it as a Vite project

### Step 3 — Configure Build Settings

| Field              | Value              |
|--------------------|--------------------|
| Framework Preset   | `Vite`             |
| Root Directory     | `frontend`         |
| Build Command      | `npm run build`    |
| Output Directory   | `dist`             |
| Install Command    | `npm install`      |

### Step 4 — Add Environment Variable

In Vercel → your project → **Settings** → **Environment Variables**:

| Key             | Value                                       |
|-----------------|---------------------------------------------|
| `VITE_API_URL`  | `https://dsa-visualizer-api.onrender.com/api` |

### Step 5 — Deploy

1. Click **Deploy**
2. Your frontend will be live at: `https://dsa-visualizer.vercel.app`

### Step 6 — Update CORS_ORIGIN on Render

Go back to Render → Environment → update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://dsa-visualizer.vercel.app
```
Render will redeploy automatically.

---

## 📦 GitHub Setup

### Step 1 — Initialize & First Commit

```bash
cd /home/shivaraj/DSA-Visualizer

# Initialize git (already done if .git exists)
git init

# Stage all files
git add .

# First commit
git commit -m "feat: initial production-ready DSA Visualizer"
```

### Step 2 — Create GitHub Repo

1. Go to [https://github.com/new](https://github.com/new)
2. Name: `DSA-Visualizer`
3. Make it **Public** (required for free Render/Vercel)
4. **Do NOT** initialize with README (we have one)
5. Click **Create repository**

### Step 3 — Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/DSA-Visualizer.git
git branch -M main
git push -u origin main
```

### Step 4 — GitHub Actions Secrets (optional)

For the CI/CD pipeline, add in GitHub → repo → **Settings** → **Secrets and variables** → **Actions**:

| Secret Name    | Value                                       |
|----------------|---------------------------------------------|
| `VITE_API_URL` | `https://dsa-visualizer-api.onrender.com/api` |

### Step 5 — Enable Auto-Deploy

- **Render**: already auto-deploys on push to `main` ✅
- **Vercel**: already auto-deploys on push to `main` ✅
- Every `git push origin main` triggers full CI/CD pipeline

---

## ➕ Adding New Algorithms

### Method 1 — Via Seeder (Bulk)

Edit `backend/src/seeders/algorithmSeeder.js`, add a new object to `sampleAlgorithms`:

```javascript
{
  name: 'Heap Sort',
  category: 'sorting',           // must match enum in Algorithm model
  difficulty: 'medium',          // easy | medium | hard
  description: {
    short: 'Sorting using a binary heap data structure.',
    detailed: 'Heap Sort ...',
  },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
  },
  codeSnippets: [
    { language: 'python', code: `...` },
    { language: 'javascript', code: `...` },
    { language: 'cpp', code: `...` },
  ],
  visualizations: [
    { platform: 'visualgo', url: 'https://visualgo.net/en/heap', title: 'Heap Sort Visualization' }
  ],
  tags: ['sorting', 'heap', 'in-place'],
  prerequisites: ['Binary Trees', 'Heaps'],
  useCases: ['Priority queues', 'Median finding'],
}
```

Then run:
```bash
cd backend && npm run seed
```

### Method 2 — Direct API (POST)

```bash
curl -X POST https://dsa-visualizer-api.onrender.com/api/algorithms \
  -H "Content-Type: application/json" \
  -d '{ "name": "...", "category": "...", ... }'
```

*(Note: add admin auth middleware before exposing POST in production)*

---

## 📈 Future Roadmap

| Feature                     | Priority |
|-----------------------------|----------|
| User auth (JWT)             | High     |
| Admin panel (add/edit algos)| High     |
| Interactive canvas visualizer| High    |
| Bookmark / favourites       | Medium   |
| Progress tracking           | Medium   |
| Algorithm quiz mode         | Medium   |
| Compare algorithms          | Low      |
| Dark/Light theme toggle     | Low      |
| Offline PWA support         | Low      |

---

## 🔒 Security Best Practices Implemented

- Rate limiting (100 req / 15 min per IP)
- CORS whitelist — only allowed origins accepted
- Helmet-style security headers via `vercel.json`
- `.env` never committed — `.gitignore` enforced
- Input validation via `express-validator`
- `lean()` queries — no Mongoose overhead in reads
- MongoDB Atlas — encrypted at rest, automated backups

---

## ⚡ Performance Optimizations

- MongoDB compound indexes: `{ category, difficulty }`, `{ analytics.views: -1 }`
- Full-text index on `name`, `description.short`, `tags`
- `Promise.all()` for parallel DB queries in stats endpoint
- `select('-__v -codeSnippets')` on listing — code only fetched on detail
- Vite code-splitting + asset hashing for frontend
- `lean()` on all read queries — plain JS objects, no Mongoose overhead
- Debounced search (500ms) — avoids excessive API calls
- Vercel CDN edge caching for static assets

---

## 🛠️ API Reference

| Method | Endpoint                         | Description                  |
|--------|----------------------------------|------------------------------|
| GET    | `/api/health`                    | Health check                 |
| GET    | `/api/algorithms`                | List with filter/search/page |
| GET    | `/api/algorithms/stats`          | Platform statistics          |
| GET    | `/api/algorithms/popular`        | Top algorithms by views      |
| GET    | `/api/algorithms/categories`     | All categories + counts      |
| GET    | `/api/algorithms/search?q=`      | Autocomplete search          |
| GET    | `/api/algorithms/:slug`          | Full algorithm detail        |
| POST   | `/api/algorithms/:slug/like`     | Toggle like                  |
| POST   | `/api/analytics/track`           | Track analytics event        |
| GET    | `/api/analytics/:slug`           | Get algorithm analytics      |
