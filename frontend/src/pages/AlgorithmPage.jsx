import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const { algorithms, loading, error, refetch } = useAlgorithms();
  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  // Fetch algorithm by slug if provided
  useEffect(() => {
    if (slug) {
      fetchAlgorithmBySlug(slug);
    }
  }, [slug]);

  // Refetch when filters change
  useEffect(() => {
    const filters = {};
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (selectedDifficulty !== 'all') filters.difficulty = selectedDifficulty;
    if (debouncedSearch) filters.search = debouncedSearch;
    refetch(filters);
  }, [selectedCategory, selectedDifficulty, debouncedSearch]);

  const fetchAlgorithmBySlug = async (slug) => {
    try {
      setDetailLoading(true);
      const response = await algorithmAPI.getBySlug(slug);
      setSelectedAlgorithm(response.data.algorithm);
    } catch (error) {
      console.error('Error fetching algorithm:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleCloseDetail = () => {
    setSelectedAlgorithm(null);
    window.history.pushState({}, '', '/algorithms');
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-4">
            Algorithm <span className="gradient-text">Library</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Explore {algorithms.length} carefully crafted algorithm implementations
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar value={searchTerm} onChange={handleSearch} />
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <CategoryTabs
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
            <FilterBar
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => refetch()} className="btn-primary">
              Retry
            </button>
          </div>
        ) : algorithms.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No algorithms found</p>
          </div>
        ) : (
          <AlgorithmGrid
            algorithms={algorithms}
            onAlgorithmClick={handleAlgorithmClick}
          />
        )}
      </div>

      {/* Algorithm Detail Modal */}
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
