// At the END of algorithmController.js

// ❌ Wrong - Named export
// export { runBubbleSort, runQuickSort, ... };

// ✅ Correct - Default export
export default {
  runBubbleSort,
  runQuickSort,
  runMergeSort,
  // ... all your functions
};
