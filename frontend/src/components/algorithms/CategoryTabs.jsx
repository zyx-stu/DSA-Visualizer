import React from 'react';
import { motion } from 'framer-motion';

const CategoryTabs = ({ selected, onChange }) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'sorting', label: 'Sorting' },
    { id: 'searching', label: 'Searching' },
    { id: 'graph', label: 'Graph' },
    { id: 'tree', label: 'Tree' },
    { id: 'dynamic-programming', label: 'DP' },
    { id: 'greedy', label: 'Greedy' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(category.id)}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            selected === category.id
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
              : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryTabs;
