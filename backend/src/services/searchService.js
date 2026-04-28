// Linear Search Algorithm
export const linearSearch = (array, target) => {
  const steps = [];
  
  for (let i = 0; i < array.length; i++) {
    steps.push({
      checking: i,
      array: [...array],
      found: array[i] === target,
      message: `Checking index ${i}: ${array[i]}`
    });
    
    if (array[i] === target) {
      steps.push({
        found: true,
        index: i,
        message: `Target ${target} found at index ${i}`,
        array: [...array]
      });
      return steps;
    }
  }
  
  steps.push({
    found: false,
    message: `Target ${target} not found in array`,
    array: [...array]
  });
  
  return steps;
};

// Binary Search Algorithm (requires sorted array)
export const binarySearch = (array, target) => {
  const steps = [];
  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      left,
      right,
      mid,
      checking: mid,
      array: [...array],
      message: `Checking middle index ${mid}: ${array[mid]}`
    });
    
    if (array[mid] === target) {
      steps.push({
        found: true,
        index: mid,
        message: `Target ${target} found at index ${mid}`,
        array: [...array]
      });
      return steps;
    }
    
    if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        message: `${array[mid]} < ${target}, searching right half`,
        array: [...array],
        left,
        right
      });
    } else {
      right = mid - 1;
      steps.push({
        message: `${array[mid]} > ${target}, searching left half`,
        array: [...array],
        left,
        right
      });
    }
  }
  
  steps.push({
    found: false,
    message: `Target ${target} not found in array`,
    array: [...array]
  });
  
  return steps;
};

// Jump Search Algorithm
export const jumpSearch = (array, target) => {
  const steps = [];
  const n = array.length;
  const jump = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  // Jump through array
  while (array[Math.min(jump, n) - 1] < target) {
    steps.push({
      checking: Math.min(jump, n) - 1,
      jump: true,
      message: `Jumping to index ${Math.min(jump, n) - 1}`,
      array: [...array]
    });
    
    prev = jump;
    jump += Math.floor(Math.sqrt(n));
    
    if (prev >= n) {
      steps.push({
        found: false,
        message: `Target ${target} not found`,
        array: [...array]
      });
      return steps;
    }
  }
  
  // Linear search in the identified block
  while (array[prev] < target) {
    steps.push({
      checking: prev,
      message: `Linear search at index ${prev}`,
      array: [...array]
    });
    
    prev++;
    
    if (prev === Math.min(jump, n)) {
      steps.push({
        found: false,
        message: `Target ${target} not found`,
        array: [...array]
      });
      return steps;
    }
  }
  
  if (array[prev] === target) {
    steps.push({
      found: true,
      index: prev,
      message: `Target ${target} found at index ${prev}`,
      array: [...array]
    });
    return steps;
  }
  
  steps.push({
    found: false,
    message: `Target ${target} not found`,
    array: [...array]
  });
  
  return steps;
};

export default {
  linearSearch,
  binarySearch,
  jumpSearch
};
