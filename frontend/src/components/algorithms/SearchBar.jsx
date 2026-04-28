import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl"
    >
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
      <input
        id="algorithm-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search algorithms by name, category, or tag..."
        className="input pl-12 pr-10"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
