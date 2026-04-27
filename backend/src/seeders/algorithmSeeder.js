import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Algorithm from '../models/Algorithm.js';
import connectDB from '../config/database.js';

dotenv.config();

const sampleAlgorithms = [
  {
    name: 'Bubble Sort',
    category: 'sorting',
    difficulty: 'easy',
    description: {
      short: 'Simple sorting algorithm that repeatedly steps through the list',
      detailed: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    },
    complexity: {
      time: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      space: 'O(1)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      },
      {
        language: 'javascript',
        code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
      },
      {
        language: 'cpp',
        code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
      },
    ],
    visualizations: [
      {
        platform: 'visualgo',
        url: 'https://visualgo.net/en/sorting',
        title: 'VisuAlgo - Bubble Sort Visualization',
      },
    ],
    tags: ['sorting', 'comparison', 'basic'],
    useCases: ['Educational purposes', 'Small datasets'],
  },
  {
    name: 'Binary Search',
    category: 'searching',
    difficulty: 'easy',
    description: {
      short: 'Efficiently find an element in a sorted array by repeatedly dividing the search interval in half',
      detailed: 'Binary Search is a search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and eliminates half of the search space.',
    },
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
      },
      space: 'O(1)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
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
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
      },
    ],
    visualizations: [
      {
        platform: 'visualgo',
        url: 'https://visualgo.net/en/bst',
        title: 'Binary Search Visualization',
      },
    ],
    tags: ['searching', 'divide-and-conquer', 'sorted-array'],
    useCases: ['Searching in sorted data', 'Database indexing'],
  },
  {
    name: 'Depth First Search',
    category: 'graph',
    difficulty: 'medium',
    description: {
      short: 'Graph traversal algorithm that explores as far as possible along each branch',
      detailed: 'Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root and explores as far as possible along each branch before backtracking.',
    },
    complexity: {
      time: {
        best: 'O(V + E)',
        average: 'O(V + E)',
        worst: 'O(V + E)',
      },
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
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    
    return visited`,
      },
      {
        language: 'javascript',
        code: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start);
    
    for (const neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
    
    return visited;
}`,
      },
    ],
    visualizations: [
      {
        platform: 'visualgo',
        url: 'https://visualgo.net/en/dfsbfs',
        title: 'DFS Visualization',
      },
    ],
    tags: ['graph', 'traversal', 'recursion'],
    useCases: ['Path finding', 'Cycle detection', 'Topological sorting'],
  },
  {
    name: 'Quick Sort',
    category: 'sorting',
    difficulty: 'medium',
    description: {
      short: 'Efficient divide-and-conquer sorting algorithm',
      detailed: 'QuickSort is a highly efficient sorting algorithm that uses divide-and-conquer strategy. It picks an element as pivot and partitions the array around the pivot.',
    },
    complexity: {
      time: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
      },
      space: 'O(log n)',
    },
    codeSnippets: [
      {
        language: 'python',
        code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
      },
      {
        language: 'javascript',
        code: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
      },
    ],
    visualizations: [
      {
        platform: 'visualgo',
        url: 'https://visualgo.net/en/sorting',
        title: 'Quick Sort Visualization',
      },
    ],
    tags: ['sorting', 'divide-and-conquer', 'efficient'],
    useCases: ['General purpose sorting', 'Large datasets'],
  },
  {
    name: 'Dijkstra\'s Algorithm',
    category: 'graph',
    difficulty: 'hard',
    description: {
      short: 'Find shortest paths from source to all vertices in weighted graph',
      detailed: 'Dijkstra\'s algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights.',
    },
    complexity: {
      time: {
        best: 'O(E log V)',
        average: 'O(E log V)',
        worst: 'O(E log V)',
      },
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
        current_dist, current = heapq.heappop(pq)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph[current].items():
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
      },
    ],
    visualizations: [
      {
        platform: 'visualgo',
        url: 'https://visualgo.net/en/sssp',
        title: 'Dijkstra\'s Algorithm Visualization',
      },
    ],
    tags: ['graph', 'shortest-path', 'greedy'],
    useCases: ['GPS navigation', 'Network routing', 'Maps'],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Algorithm.deleteMany({});
    console.log('🗑️  Cleared existing algorithms');

    // Insert sample data
    const inserted = await Algorithm.insertMany(sampleAlgorithms);
    console.log(`✅ Inserted ${inserted.length} algorithms`);

    console.log('\n📊 Seeding complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
