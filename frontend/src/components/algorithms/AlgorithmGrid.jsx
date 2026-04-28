import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlgorithmCard from './AlgorithmCard';

const AlgorithmGrid = ({ algorithms, onAlgorithmClick }) => {
  if (algorithms.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-gray-300 text-xl font-semibold mb-2">No algorithms found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {algorithms.map((algorithm) => (
          <AlgorithmCard
            key={algorithm._id || algorithm.slug}
            algorithm={algorithm}
            onClick={onAlgorithmClick}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlgorithmGrid;
