import React from 'react';
import { FiExternalLink, FiPlay } from 'react-icons/fi';
import { motion } from 'framer-motion';

const VisualizationLinks = ({ visualizations }) => {
  const platformIcons = {
    visualgo: '🎯',
    'algorithm-visualizer': '🔬',
    youtube: '▶️',
    custom: '✨',
    other: '🔗',
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {visualizations.map((viz, index) => (
        <motion.a
          key={index}
          href={viz.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg group transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{platformIcons[viz.platform] || '🔗'}</span>
            <div>
              <p className="font-medium group-hover:text-primary-400 transition-colors">
                {viz.title}
              </p>
              <p className="text-sm text-gray-400">{viz.platform}</p>
            </div>
          </div>
          <FiExternalLink className="text-gray-400 group-hover:text-primary-400 transition-colors" />
        </motion.a>
      ))}
    </div>
  );
};

export default VisualizationLinks;
