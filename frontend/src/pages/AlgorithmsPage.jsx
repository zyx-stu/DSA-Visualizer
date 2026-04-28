import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/algorithms/FilterBar';
import SearchBar from '../components/algorithms/SearchBar';
import CategoryTabs from '../components/algorithms/CategoryTabs';
import AlgorithmGrid from '../components/algorithms/AlgorithmGrid';
import AlgorithmDetail from '../components/detail/AlgorithmDetail';
import Loader from '../components/common/Loader';
import { useAlgorithms } from '../hooks/useAlgorithms';
import { useSearch } from '../hooks/useSearch';
import { algorithmAPI } from '../services/api';

const AlgorithmsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const { algorithms, loading, error, refetch } = useAlgorithms();
  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  // If a slug comes in via URL, load that algorithm into the panel
  useEffect(() => {
    if (slug) {
      fetchAlgorithmBySlug(slug);
    }
  }, [slug]);

  // Re-fetch when any filter / search changes
  useEffect(() => {
    const filters = {};
    if (selectedCategory !== 'all')    filters.category   = selectedCategory;
    if (selectedDifficulty !== 'all')  filters.difficulty = selectedDifficulty;
    if (debouncedSearch)               filters.search     = debouncedSearch;
    refetch(filters);
  }, [selectedCategory, selectedDifficulty, debouncedSearch]);

  const fetchAlgorithmBySlug = async (s) => {
    try {
      setDetailLoading(true);
      const res = await algorithmAPI.getBySlug(s);
      setSelectedAlgorithm(res.data?.algorithm || res.data);
    } catch (err) {
      console.error('Error fetching algorithm:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    // Update URL without full navigation
    window.history.pushState({}, '', `/algorithms/${algorithm.slug}`);
  };

  const handleCloseDetail = () => {
    setSelectedAlgorithm(null);
    navigate('/algorithms', { replace: true });
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container-custom">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">
            Algorithm <span className="gradient-text">Library</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {loading
              ? 'Loading algorithms…'
              : `Explore ${algorithms.length} carefully crafted algorithm implementations`}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-5">
          <SearchBar value={searchTerm} onChange={handleSearch} />
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 overflow-x-auto">
              <CategoryTabs selected={selectedCategory} onChange={setSelectedCategory} />
            </div>
            <div className="shrink-0">
              <FilterBar
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={() => refetch()} className="btn-primary">
              Retry
            </button>
          </div>
        ) : (
          <AlgorithmGrid
            algorithms={algorithms}
            onAlgorithmClick={handleAlgorithmClick}
          />
        )}
      </div>

      {/* Slide-in Detail Panel */}
      <AnimatePresence>
        {selectedAlgorithm && (
          <AlgorithmDetail
            algorithm={selectedAlgorithm}
            onClose={handleCloseDetail}
            loading={detailLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmsPage;
