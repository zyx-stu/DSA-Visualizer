require('dotenv').config();
const mongoose = require('mongoose');
const Algorithm = require('./models/Algorithm');

const data = [
  {
    name: 'Bubble Sort', category: 'Sorting', difficulty: 'Easy',
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
    timeComplex: 'O(n²)', spaceComplex: 'O(1)',
    visualizerUrl: 'https://visualgo.net/en/sorting?slide=3',
    tags: ['sorting', 'comparison']
  },
  {
    name: 'Merge Sort', category: 'Sorting', difficulty: 'Medium',
    description: 'Divides array in half, recursively sorts each half, then merges.',
    timeComplex: 'O(n log n)', spaceComplex: 'O(n)',
    visualizerUrl: 'https://visualgo.net/en/sorting?slide=7',
    tags: ['sorting', 'divide-and-conquer']
  },
  {
    name: 'Quick Sort', category: 'Sorting', difficulty: 'Medium',
    description: 'Picks a pivot, partitions array around it, recursively sorts.',
    timeComplex: 'O(n log n) avg', spaceComplex: 'O(log n)',
    visualizerUrl: 'https://visualgo.net/en/sorting?slide=11',
    tags: ['sorting', 'in-place']
  },
  {
    name: 'Binary Search', category: 'Searching', difficulty: 'Easy',
    description: 'Finds element in sorted array by halving the search space each step.',
    timeComplex: 'O(log n)', spaceComplex: 'O(1)',
    visualizerUrl: 'https://visualgo.net/en/binarysearch',
    tags: ['searching', 'sorted']
  },
  {
    name: "Dijkstra's Algorithm", category: 'Graph', difficulty: 'Hard',
    description: 'Finds shortest path from source to all nodes in a weighted graph.',
    timeComplex: 'O((V+E) log V)', spaceComplex: 'O(V)',
    visualizerUrl: 'https://visualgo.net/en/sssp',
    tags: ['graph', 'shortest-path', 'greedy']
  },
  {
    name: 'BFS', category: 'Graph', difficulty: 'Medium',
    description: 'Explores graph level by level using a queue.',
    timeComplex: 'O(V+E)', spaceComplex: 'O(V)',
    visualizerUrl: 'https://visualgo.net/en/bfs',
    tags: ['graph', 'traversal']
  },
  {
    name: 'DFS', category: 'Graph', difficulty: 'Medium',
    description: 'Explores as far as possible along each branch before backtracking.',
    timeComplex: 'O(V+E)', spaceComplex: 'O(V)',
    visualizerUrl: 'https://visualgo.net/en/dfs',
    tags: ['graph', 'traversal', 'recursion']
  },
  {
    name: 'Linked List', category: 'Data Structures', difficulty: 'Easy',
    description: 'Linear data structure where elements are linked using pointers.',
    timeComplex: 'O(n) search', spaceComplex: 'O(n)',
    visualizerUrl: 'https://visualgo.net/en/list',
    tags: ['linked-list', 'pointers']
  },
  {
    name: 'Binary Search Tree', category: 'Data Structures', difficulty: 'Medium',
    description: 'Tree where left child < parent < right child for all nodes.',
    timeComplex: 'O(log n) avg', spaceComplex: 'O(n)',
    visualizerUrl: 'https://visualgo.net/en/bst',
    tags: ['tree', 'bst']
  },
  {
    name: 'Dynamic Programming - Knapsack', category: 'Dynamic Programming', difficulty: 'Hard',
    description: 'Solves optimization problems by breaking into overlapping subproblems.',
    timeComplex: 'O(n·W)', spaceComplex: 'O(n·W)',
    visualizerUrl: 'https://visualgo.net/en/dp',
    tags: ['dp', 'optimization']
  },
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Algorithm.deleteMany({});
  await Algorithm.insertMany(data);
  console.log('Database seeded!');
  process.exit(0);
});
