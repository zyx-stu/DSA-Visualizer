import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../utils/constants';

const ALL_TABS = ['all', ...CATEGORIES];

const LABEL_MAP = {
  all: 'All',
  'sorting': 'Sorting',
  'searching': 'Searching',
  'graph': 'Graph',
  'tree': 'Tree',
  'dynamic-programming': 'DP',
  'greedy': 'Greedy',
  'backtracking': 'Backtracking',
  'divide-conquer': 'Divide & Conquer',
};

const CategoryTabs = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Algorithm categories">
      {ALL_TABS.map((tab) => {
        const isActive = selected === tab;
        return (
          <button
            key={tab}
            id={`category-tab-${tab}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200 bg-dark-800 hover:bg-dark-700'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 bg-primary-600 rounded-lg z-0"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{LABEL_MAP[tab] || tab}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
