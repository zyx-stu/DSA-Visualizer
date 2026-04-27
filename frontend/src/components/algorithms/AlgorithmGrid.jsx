import React from 'react';
import { motion } from 'framer-motion';
import AlgorithmCard from './AlgorithmCard';

const AlgorithmGrid = ({ algorithms, onAlgorithmClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {algorithms.map((algorithm, index) => (
        <AlgorithmCard
          key={algorithm._id}
          algorithm={algorithm}
          index={index}
          onClick={() => onAlgorithmClick(algorithm)}
        />
      ))}
    </motion.div>
  );
};

export default AlgorithmGrid;
