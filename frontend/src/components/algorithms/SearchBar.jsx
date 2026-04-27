import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="Search algorithms..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-12 w-full"
      />
    </motion.div>
  );
};

export default SearchBar;
