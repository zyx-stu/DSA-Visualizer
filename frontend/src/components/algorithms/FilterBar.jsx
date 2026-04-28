import React from 'react';
import { FiFilter } from 'react-icons/fi';

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];

const COLORS = {
  all:    'text-gray-400',
  easy:   'text-green-400',
  medium: 'text-yellow-400',
  hard:   'text-red-400',
};

const FilterBar = ({ selectedDifficulty, onDifficultyChange }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-gray-500 text-sm shrink-0">
        <FiFilter size={13} />
        Difficulty
      </span>
      <div className="flex gap-2">
        {DIFFICULTIES.map((diff) => {
          const isActive = selectedDifficulty === diff;
          return (
            <button
              key={diff}
              id={`filter-difficulty-${diff}`}
              onClick={() => onDifficultyChange(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 border ${
                isActive
                  ? `${COLORS[diff]} bg-dark-700 border-current/30`
                  : 'text-gray-500 bg-dark-800 border-dark-700 hover:bg-dark-700 hover:text-gray-300'
              }`}
            >
              {diff === 'all' ? 'All' : diff}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
