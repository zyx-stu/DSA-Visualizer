import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiEye, FiHeart } from 'react-icons/fi';
import { DIFFICULTY_COLORS } from '../../utils/constants';

const CATEGORY_ICONS = {
  sorting: '⚡',
  searching: '🔍',
  graph: '🕸️',
  tree: '🌲',
  'dynamic-programming': '🧩',
  greedy: '💰',
  backtracking: '🔄',
  'divide-conquer': '✂️',
  default: '📌',
};

const AlgorithmCard = ({ algorithm, onClick }) => {
  const { name, category, difficulty, description, analytics, tags } = algorithm;
  const diffColors = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.easy;
  const categoryIcon = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(algorithm)}
      className="card cursor-pointer group relative overflow-hidden border border-dark-800 hover:border-primary-500/40 transition-all duration-300"
      id={`algorithm-card-${algorithm.slug}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(algorithm)}
      aria-label={`View ${name} algorithm`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{categoryIcon}</span>
          <span className="text-gray-500 text-xs capitalize">{category?.replace('-', ' ')}</span>
        </div>
        <span
          className={`badge ${diffColors.bg} ${diffColors.text} border ${diffColors.border} capitalize`}
        >
          {difficulty}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-gray-100 font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors duration-200">
        {name}
      </h3>

      {/* Short description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
        {description?.short || ''}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-dark-800 text-gray-500 rounded-md border border-dark-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-800">
        <div className="flex items-center gap-3 text-gray-600 text-xs">
          <span className="flex items-center gap-1">
            <FiEye size={11} />
            {analytics?.views || 0}
          </span>
          <span className="flex items-center gap-1">
            <FiHeart size={11} />
            {analytics?.likes || 0}
          </span>
        </div>
        <span className="text-primary-500 text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-200 font-medium">
          View <FiArrowRight size={12} />
        </span>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
