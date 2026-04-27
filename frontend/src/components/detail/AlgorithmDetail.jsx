import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiCopy, FiExternalLink, FiHeart, FiClock, FiDatabase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeBlock from './CodeBlock';
import VisualizationLinks from './VisualizationLinks';
import ComplexityBadge from './ComplexityBadge';
import Loader from '../common/Loader';
import { algorithmAPI } from '../../services/api';

const AlgorithmDetail = ({ algorithm, onClose, loading }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    algorithm?.codeSnippets?.[0]?.language || 'python'
  );
  const [liked, setLiked] = useState(false);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      await algorithmAPI.like(algorithm._id);
      setLiked(true);
      toast.success('Liked!');
    } catch (error) {
      toast.error('Failed to like');
    }
  };

  const selectedCode = algorithm?.codeSnippets?.find(
    (snippet) => snippet.language === selectedLanguage
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-950/95 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <Loader />
      </motion.div>
    );
  }

  if (!algorithm) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/95 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-10 px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl mx-auto bg-dark-900 border border-dark-800 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 border-b border-dark-800">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3">{algorithm.name}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="badge bg-dark-800 text-gray-300 border border-dark-700">
                    {algorithm.category}
                  </span>
                  <ComplexityBadge difficulty={algorithm.difficulty} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {algorithm.description?.detailed}
            </p>
          </div>

          {/* Complexity Info */}
          <div className="p-8 border-b border-dark-800 bg-dark-800/30">
            <h3 className="text-xl font-semibold mb-4">Complexity Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 text-primary-500 mb-2">
                  <FiClock />
                  <span className="font-semibold">Time Complexity</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">
                    Best: <span className="text-white">{algorithm.complexity?.time?.best}</span>
                  </p>
                  <p className="text-gray-400">
                    Average: <span className="text-white">{algorithm.complexity?.time?.average}</span>
                  </p>
                  <p className="text-gray-400">
                    Worst: <span className="text-white">{algorithm.complexity?.time?.worst}</span>
                  </p>
                </div>
              </div>

              <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                <div className="flex items-center gap-2 text-primary-500 mb-2">
                  <FiDatabase />
                  <span className="font-semibold">Space Complexity</span>
                </div>
                <p className="text-white text-2xl font-mono">
                  {algorithm.complexity?.space}
                </p>
              </div>
            </div>
          </div>

          {/* Code Implementation */}
          <div className="p-8 border-b border-dark-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Implementation</h3>
              <div className="flex gap-2">
                {algorithm.codeSnippets?.map((snippet) => (
                  <button
                    key={snippet.language}
                    onClick={() => setSelectedLanguage(snippet.language)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === snippet.language
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                    }`}
                  >
                    {snippet.language.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {selectedCode && (
              <div className="relative">
                <button
                  onClick={() => handleCopy(selectedCode.code)}
                  className="absolute top-4 right-4 p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors z-10"
                  title="Copy code"
                >
                  <FiCopy />
                </button>
                <CodeBlock code={selectedCode.code} language={selectedLanguage} />
              </div>
            )}
          </div>

          {/* Visualizations */}
          {algorithm.visualizations && algorithm.visualizations.length > 0 && (
            <div className="p-8 border-b border-dark-800">
              <h3 className="text-xl font-semibold mb-4">
                Interactive Visualizations
              </h3>
              <VisualizationLinks visualizations={algorithm.visualizations} />
            </div>
          )}

          {/* Use Cases */}
          {algorithm.useCases && algorithm.useCases.length > 0 && (
            <div className="p-8 border-b border-dark-800">
              <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
              <ul className="space-y-2">
                {algorithm.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-primary-500 mt-1">•</span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex gap-6 text-gray-400">
              <span className="flex items-center gap-2">
                <FiEye />
                {algorithm.analytics?.views || 0} views
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${
                  liked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <FiHeart className={liked ? 'fill-current' : ''} />
                {(algorithm.analytics?.likes || 0) + (liked ? 1 : 0)}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AlgorithmDetail;
