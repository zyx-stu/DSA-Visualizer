import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiDatabase, FiEye, FiHeart } from 'react-icons/fi';

const AlgorithmCard = ({ algorithm, index, onClick }) => {
  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="card cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
            {algorithm.name}
          </h3>
          <span className="badge bg-dark-800 text-gray-300 border border-dark-700">
            {algorithm.category}
          </span>
        </div>
        <div className={`badge border ${difficultyColors[algorithm.difficulty]}`}>
          {algorithm.difficulty}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {algorithm.description?.short || algorithm.description?.detailed}
      </p>

      {/* Complexity */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <FiClock className="text-primary-500" />
          <span>Time: {algorithm.complexity?.time?.worst}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <FiDatabase className="text-primary-500" />
          <span>Space: {algorithm.complexity?.space}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-800">
        <div className="flex gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FiEye size={16} />
            {algorithm.analytics?.views || 0}
          </span>
          <span className="flex items-center gap-1">
            <FiHeart size={16} />
            {algorithm.analytics?.likes || 0}
          </span>
        </div>
        <div className="flex gap-1">
          {algorithm.codeSnippets?.slice(0, 3).map((snippet) => (
            <span
              key={snippet.language}
              className="px-2 py-1 bg-dark-800 rounded text-xs text-gray-400"
            >
              {snippet.language}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
