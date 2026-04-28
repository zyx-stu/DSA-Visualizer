import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiX, FiHeart, FiExternalLink, FiClock,
  FiCpu, FiTag, FiChevronRight,
} from 'react-icons/fi';
import CodeBlock from './CodeBlock';
import ComplexityBadge from './ComplexityBadge';
import VisualizationLinks from './VisualizationLinks';
import { algorithmAPI } from '../../services/api';
import { DIFFICULTY_COLORS } from '../../utils/constants';
import Loader from '../common/Loader';
import toast from 'react-hot-toast';

const AlgorithmDetail = ({ algorithm: initialAlgorithm, onClose, loading }) => {
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [liked, setLiked] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // If only partial data, fetch full detail by slug
    if (initialAlgorithm?.slug && !initialAlgorithm?.codeSnippets?.length) {
      algorithmAPI.getBySlug(initialAlgorithm.slug)
        .then((res) => setAlgorithm(res.data?.algorithm || res.data))
        .catch(console.error);
    } else {
      setAlgorithm(initialAlgorithm);
    }
  }, [initialAlgorithm]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleLike = async () => {
    if (liked) return;
    try {
      setLiked(true);
      setAlgorithm((prev) => ({
        ...prev,
        analytics: { ...prev.analytics, likes: (prev.analytics?.likes || 0) + 1 },
      }));
      await algorithmAPI.like(algorithm.slug);
      toast.success('Liked! ❤️');
    } catch {
      setLiked(false);
      toast.error('Failed to like');
    }
  };

  const diff = algorithm?.difficulty;
  const diffColors = DIFFICULTY_COLORS[diff] || DIFFICULTY_COLORS.easy;

  const sections = ['overview', 'code', 'complexity', 'visualizations'];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-dark-900 border-l border-dark-800 z-50 flex flex-col overflow-hidden shadow-2xl"
        id="algorithm-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${algorithm?.name} details`}
      >
        {loading || !algorithm ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader text="Loading algorithm..." />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 border-b border-dark-800 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-500 text-xs capitalize">
                      {algorithm.category?.replace('-', ' ')}
                    </span>
                    <FiChevronRight className="text-dark-600" size={12} />
                    <span className={`text-xs font-semibold capitalize ${diffColors.text}`}>
                      {algorithm.difficulty}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100 truncate">{algorithm.name}</h2>
                  <p className="text-gray-500 text-sm mt-1.5 line-clamp-2">
                    {algorithm.description?.short}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleLike}
                    disabled={liked}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      liked
                        ? 'text-red-400 bg-red-500/10 cursor-default'
                        : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10 bg-dark-800'
                    }`}
                    aria-label="Like algorithm"
                    id="detail-like-btn"
                  >
                    <FiHeart size={14} className={liked ? 'fill-current' : ''} />
                    {algorithm.analytics?.likes || 0}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-100 hover:bg-dark-800 rounded-lg transition-all"
                    aria-label="Close panel"
                    id="detail-close-btn"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>

              {/* Section nav */}
              <div className="flex gap-1 mt-5 overflow-x-auto">
                {sections.map((s) => (
                  <button
                    key={s}
                    id={`detail-section-${s}`}
                    onClick={() => setActiveSection(s)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize whitespace-nowrap transition-all duration-200 ${
                      activeSection === s
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800'
                    }`}
                  >
                    {s === 'complexity' ? 'Complexity' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* OVERVIEW */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-300 font-semibold mb-3">Description</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {algorithm.description?.detailed || algorithm.description?.short}
                    </p>
                  </div>

                  {algorithm.prerequisites?.length > 0 && (
                    <div>
                      <h3 className="text-gray-300 font-semibold mb-3">Prerequisites</h3>
                      <div className="flex flex-wrap gap-2">
                        {algorithm.prerequisites.map((p) => (
                          <span key={p} className="badge bg-dark-800 text-gray-400 border border-dark-700">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {algorithm.useCases?.length > 0 && (
                    <div>
                      <h3 className="text-gray-300 font-semibold mb-3">Use Cases</h3>
                      <ul className="space-y-2">
                        {algorithm.useCases.map((uc) => (
                          <li key={uc} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="text-primary-400 mt-0.5">•</span>
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {algorithm.tags?.length > 0 && (
                    <div>
                      <h3 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
                        <FiTag size={14} /> Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {algorithm.tags.map((tag) => (
                          <span key={tag} className="badge bg-dark-800 text-primary-400 border border-primary-500/20 text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CODE */}
              {activeSection === 'code' && (
                <CodeBlock codeSnippets={algorithm.codeSnippets || []} />
              )}

              {/* COMPLEXITY */}
              {activeSection === 'complexity' && algorithm.complexity && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                      <FiClock size={14} /> Time Complexity
                    </h3>
                    <div className="space-y-3">
                      {algorithm.complexity.time?.best && (
                        <ComplexityBadge label="Best" value={algorithm.complexity.time.best} />
                      )}
                      {algorithm.complexity.time?.average && (
                        <ComplexityBadge label="Average" value={algorithm.complexity.time.average} />
                      )}
                      {algorithm.complexity.time?.worst && (
                        <ComplexityBadge label="Worst" value={algorithm.complexity.time.worst} />
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                      <FiCpu size={14} /> Space Complexity
                    </h3>
                    <ComplexityBadge label="Space" value={algorithm.complexity.space} />
                  </div>
                </div>
              )}

              {/* VISUALIZATIONS */}
              {activeSection === 'visualizations' && (
                <div>
                  <h3 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
                    <FiExternalLink size={14} /> Interactive Visualizations
                  </h3>
                  <VisualizationLinks visualizations={algorithm.visualizations} />
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default AlgorithmDetail;
