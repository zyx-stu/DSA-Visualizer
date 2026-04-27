import React from 'react';
import { FiFilter } from 'react-icons/fi';

const FilterBar = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = [
    { value: 'all', label: 'All Levels', color: 'text-gray-400' },
    { value: 'easy', label: 'Easy', color: 'text-green-500' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'text-red-500' },
  ];

  return (
    <div className="flex items-center gap-3">
      <FiFilter className="text-gray-400" />
      <select
        value={selectedDifficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="input py-2.5"
      >
        {difficulties.map((diff) => (
          <option key={diff.value} value={diff.value}>
            {diff.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
