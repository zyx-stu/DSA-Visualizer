/**
 * Algorithm Seeder — CommonJS version
 * Run: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/database');
const Algorithm = require('../models/Algorithm');

const sampleAlgorithms = [
  {
    name: 'Bubble Sort',
    category: 'sorting',
    difficulty: 'easy',
    description: {
      short: 'Simple sorting algorithm that repeatedly steps through the list comparing adjacent elements.',
      detailed: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It is named for the way smaller elements "bubble" to the top of the list.',
    },
    complexity: {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Optimized: early exit
    return arr`,
      },
      {
        language: 'javascript',
        code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break; // Optimized: early exit
    }
    return arr;
}`,
      },
      {
        language: 'cpp',
        code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Optimized: early exit
    }
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/sorting', title: 'VisuAlgo – Sorting Visualizer' },
    ],
    tags: ['sorting', 'comparison', 'in-place', 'stable'],
    prerequisites: ['Arrays', 'Loops'],
    useCases: ['Educational purposes', 'Very small datasets'],
  },
  {
    name: 'Binary Search',
    category: 'searching',
    difficulty: 'easy',
    description: {
      short: 'Efficiently finds an element in a sorted array by repeatedly halving the search space.',
      detailed: 'Binary Search works by comparing the target value to the middle element of a sorted array. If they are unequal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until the target is found or the remaining interval is empty.',
    },
    complexity: {
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(1)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      },
      {
        language: 'javascript',
        code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      },
      {
        language: 'cpp',
        code: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/bst', title: 'VisuAlgo – Binary Search' },
    ],
    tags: ['searching', 'divide-and-conquer', 'sorted-array'],
    prerequisites: ['Sorted Arrays', 'Loops'],
    useCases: ['Searching in sorted data', 'Database indexing', 'Finding insertion point'],
  },
  {
    name: 'Merge Sort',
    category: 'sorting',
    difficulty: 'medium',
    description: {
      short: 'Stable, divide-and-conquer sorting algorithm with guaranteed O(n log n) time.',
      detailed: 'Merge Sort divides the array into two halves, recursively sorts each half, then merges the sorted halves. It guarantees O(n log n) time in all cases and is a stable sort, making it ideal for large datasets where stability matters.',
    },
    complexity: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      },
      {
        language: 'javascript',
        code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        result.push(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
}`,
      },
      {
        language: 'cpp',
        code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(arr + l, arr + l + n1);
    vector<int> R(arr + m + 1, arr + m + 1 + n2);
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/sorting', title: 'VisuAlgo – Merge Sort' },
    ],
    tags: ['sorting', 'divide-and-conquer', 'stable', 'recursive'],
    prerequisites: ['Recursion', 'Arrays'],
    useCases: ['Large datasets', 'External sorting', 'Stable sort requirement'],
  },
  {
    name: 'Quick Sort',
    category: 'sorting',
    difficulty: 'medium',
    description: {
      short: 'Highly efficient divide-and-conquer sorting with average O(n log n) performance.',
      detailed: 'QuickSort picks a pivot element and partitions the array so elements smaller than the pivot go left and larger go right. It recursively sorts both partitions. In practice, QuickSort is faster than Merge Sort for most inputs due to better cache performance.',
    },
    complexity: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      },
      {
        language: 'javascript',
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/sorting', title: 'VisuAlgo – Quick Sort' },
    ],
    tags: ['sorting', 'divide-and-conquer', 'in-place', 'efficient'],
    prerequisites: ['Recursion', 'Arrays'],
    useCases: ['General purpose sorting', 'Large in-memory datasets'],
  },
  {
    name: 'Depth First Search',
    category: 'graph',
    difficulty: 'medium',
    description: {
      short: 'Graph traversal that explores as far as possible along each branch before backtracking.',
      detailed: 'DFS starts at the root node and explores each branch completely before backtracking. It uses a stack (or recursion) to remember the next vertex to visit. DFS is the basis for many advanced graph algorithms including topological sort, strongly connected components, and cycle detection.',
    },
    complexity: {
      time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
      space: 'O(V)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

# Iterative version
def dfs_iterative(graph, start):
    visited, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node, end=' ')
            stack.extend(graph.get(node, []))`,
      },
      {
        language: 'javascript',
        code: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    for (const neighbor of (graph[start] || [])) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
    return visited;
}

// Iterative version
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    while (stack.length) {
        const node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            console.log(node);
            (graph[node] || []).forEach(n => stack.push(n));
        }
    }
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/dfsbfs', title: 'VisuAlgo – DFS / BFS' },
    ],
    tags: ['graph', 'traversal', 'recursion', 'stack'],
    prerequisites: ['Graphs', 'Recursion', 'Sets'],
    useCases: ['Path finding', 'Cycle detection', 'Topological sorting', 'Connected components'],
  },
  {
    name: 'Breadth First Search',
    category: 'graph',
    difficulty: 'medium',
    description: {
      short: 'Level-by-level graph traversal that finds shortest paths in unweighted graphs.',
      detailed: 'BFS explores the graph level by level using a queue. It visits all neighbors of a node before moving to the next level. This property makes it ideal for finding shortest paths in unweighted graphs and for problems requiring level-order traversal.',
    },
    complexity: {
      time: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
      space: 'O(V)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node, end=' ')
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
      },
      {
        language: 'javascript',
        code: `function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    while (queue.length) {
        const node = queue.shift();
        console.log(node);
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/dfsbfs', title: 'VisuAlgo – DFS / BFS' },
    ],
    tags: ['graph', 'traversal', 'queue', 'shortest-path'],
    prerequisites: ['Graphs', 'Queues'],
    useCases: ['Shortest path (unweighted)', 'Level-order traversal', 'Peer-to-peer networks'],
  },
  {
    name: "Dijkstra's Algorithm",
    category: 'graph',
    difficulty: 'hard',
    description: {
      short: 'Find shortest paths from a source vertex to all other vertices in a weighted graph.',
      detailed: "Dijkstra's algorithm solves the single-source shortest path problem for graphs with non-negative edge weights. It uses a priority queue to greedily explore the closest unvisited vertex, guaranteeing optimal paths.",
    },
    complexity: {
      time: { best: 'O((V+E) log V)', average: 'O((V+E) log V)', worst: 'O((V+E) log V)' },
      space: 'O(V)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_dist, u = heapq.heappop(pq)
        if current_dist > distances[u]:
            continue
        for v, weight in graph[u].items():
            dist = current_dist + weight
            if dist < distances[v]:
                distances[v] = dist
                heapq.heappush(pq, (dist, v))

    return distances`,
      },
      {
        language: 'javascript',
        code: `function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    for (const node in graph) distances[node] = Infinity;
    distances[start] = 0;

    const pq = [[0, start]]; // [dist, node]
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [dist, u] = pq.shift();
        if (visited.has(u)) continue;
        visited.add(u);
        for (const [v, weight] of (graph[u] || [])) {
            const newDist = dist + weight;
            if (newDist < distances[v]) {
                distances[v] = newDist;
                pq.push([newDist, v]);
            }
        }
    }
    return distances;
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/sssp', title: 'VisuAlgo – Single Source Shortest Path' },
    ],
    tags: ['graph', 'shortest-path', 'greedy', 'priority-queue'],
    prerequisites: ['Graphs', 'Priority Queue', 'Greedy Algorithms'],
    useCases: ['GPS navigation', 'Network routing', 'Flight path optimization'],
  },
  {
    name: 'Dynamic Programming - Fibonacci',
    category: 'dynamic-programming',
    difficulty: 'easy',
    description: {
      short: 'Compute Fibonacci numbers efficiently using memoization or tabulation.',
      detailed: 'The naive recursive Fibonacci has O(2^n) time. Dynamic programming reduces this to O(n) by storing sub-problem results. This example demonstrates both top-down (memoization) and bottom-up (tabulation) DP approaches.',
    },
    complexity: {
      time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(n)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `# Top-down with memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1: return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Bottom-up tabulation
def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Space-optimized O(1) space
def fib(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      },
      {
        language: 'javascript',
        code: `// Memoization
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Bottom-up DP
function fibDP(n) {
    if (n <= 1) return n;
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Space-optimized
function fib(n) {
    if (n <= 1) return n;
    let [a, b] = [0, 1];
    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
    return b;
}`,
      },
    ],
    visualizations: [
      { platform: 'visualgo', url: 'https://visualgo.net/en/recursion', title: 'VisuAlgo – Recursion Tree' },
    ],
    tags: ['dynamic-programming', 'memoization', 'tabulation', 'recursion'],
    prerequisites: ['Recursion', 'Arrays'],
    useCases: ['Teaching DP concepts', 'Sequence problems', 'Financial modeling'],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Drop existing data AND the slug index so null slugs from
    // previous failed runs don't block this one
    await Algorithm.deleteMany({});
    console.log('🗑️  Cleared existing algorithms');

    // Drop slug index to avoid conflicts from prior bad seeds
    try {
      await Algorithm.collection.dropIndex('slug_1');
      console.log('🔧 Dropped stale slug index');
    } catch (_) {
      // Index may not exist yet — that's fine
    }

    // Use create() instead of insertMany() so pre-save hooks fire
    // (pre-save hook generates the slug from the name)
    const results = [];
    for (const data of sampleAlgorithms) {
      const doc = await Algorithm.create(data);
      results.push(doc);
      console.log(`   ✅ ${doc.name} — slug: "${doc.slug}"`);
    }

    console.log(`\n✅ Inserted ${results.length} algorithms`);
    console.log('\n🎉 Seeding complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();

