# Contributing to DSA Visualizer

Thank you for wanting to contribute! This guide covers everything you need — from setting up locally to adding new algorithms and deploying.

---

## Local Development Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (free tier)
- Git

### 1. Fork & Clone

```bash
git clone https://github.com/zyx-stu/DSA-Visualizer.git
cd DSA-Visualizer
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set your MONGODB_URI
npm run dev        # → http://localhost:5000
```

### 3. Seed the Database

```bash
npm run seed
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env.local
# VITE_API_URL=http://localhost:5000/api (already set)
npm run dev        # → http://localhost:5173
```

---

## Adding a New Algorithm

Open `backend/src/seeders/algorithmSeeder.js` and add a new object to the `sampleAlgorithms` array:

```javascript
{
  name: 'Insertion Sort',
  category: 'sorting',       // see allowed values below
  difficulty: 'easy',        // easy | medium | hard
  description: {
    short: 'Builds a sorted array one element at a time.',
    detailed: 'Insertion Sort iterates through the array, growing a sorted sub-array on the left. For each element, it finds the correct position in the sorted portion and inserts it there by shifting larger elements right.',
  },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  codeSnippets: [
    {
      language: 'python',
      code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    },
    {
      language: 'javascript',
      code: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    },
    {
      language: 'cpp',
      code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
  ],
  visualizations: [
    {
      platform: 'visualgo',
      url: 'https://visualgo.net/en/sorting',
      title: 'VisuAlgo – Insertion Sort',
    },
  ],
  tags: ['sorting', 'comparison', 'in-place', 'stable'],
  prerequisites: ['Arrays', 'Loops'],
  useCases: ['Nearly sorted data', 'Small arrays', 'Online sorting (streaming)'],
},
```

Then re-seed:
```bash
cd backend
npm run seed
```

---

## Allowed Field Values

### `category`
```
sorting | searching | graph | tree | dynamic-programming | greedy
backtracking | divide-conquer | string | math | bit-manipulation
array | linked-list | stack | queue | heap | hashing | recursion | other
```

### `difficulty`
```
easy | medium | hard
```

### `language` (codeSnippets)
```
python | javascript | cpp | java | go
```

### `platform` (visualizations)
```
visualgo | algorithm-visualizer | youtube | custom | other
```

---

## Adding Visualization Links to Existing Algorithms

Find the algorithm in `algorithmSeeder.js` and add to its `visualizations` array:

```javascript
visualizations: [
  { platform: 'visualgo', url: 'https://visualgo.net/...', title: 'VisuAlgo' },
  { platform: 'youtube',  url: 'https://youtube.com/watch?v=...', title: 'Video Explanation' },
  { platform: 'algorithm-visualizer', url: 'https://algorithm-visualizer.org/...', title: 'Algorithm Visualizer' },
],
```

---

## Submitting a Pull Request

1. Create a branch: `git checkout -b feat/add-heap-sort`
2. Add your algorithm to the seeder
3. Test locally: `npm run seed && npm run dev`
4. Commit: `git commit -m "feat: add Heap Sort algorithm"`
5. Push: `git push origin feat/add-heap-sort`
6. Open a PR on GitHub

---

## Deployment

### Backend → Render

| Field | Value |
|-------|-------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Environment variables needed:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://your-app.vercel.app
PORT=5000
```

### Frontend → Vercel

| Field | Value |
|-------|-------|
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Environment variable needed:
```
VITE_API_URL=https://your-api.onrender.com/api
```

### Seed Production Database

Since Render Shell requires a paid plan, seed from your local machine (Atlas allows connections from anywhere):
```bash
cd backend
npm run seed    # uses MONGODB_URI from .env which points to Atlas
```

---

## Code Style

- Use **functional components** with hooks (no class components except ErrorBoundary)
- Keep components **focused and small** — split if > 150 lines
- Use **Tailwind CSS** utility classes — no inline styles
- All API calls go through `src/services/api.js`
- Follow existing naming conventions (`camelCase` for functions, `PascalCase` for components)

---

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behaviour
- Browser / Node.js version
- Screenshots if UI related

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
