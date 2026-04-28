import React, { createContext, useContext, useState, useCallback } from 'react';
import { algorithmAPI } from '../services/api';

const AlgorithmContext = createContext(null);

export const AlgorithmProvider = ({ children }) => {
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: '',
    page: 1,
    limit: 12,
    sort: 'createdAt',
  });

  const fetchAlgorithms = useCallback(async (overrideFilters = {}) => {
    const activeFilters = { ...filters, ...overrideFilters };
    const params = {};

    if (activeFilters.category !== 'all') params.category = activeFilters.category;
    if (activeFilters.difficulty !== 'all') params.difficulty = activeFilters.difficulty;
    if (activeFilters.search?.trim().length >= 2) params.search = activeFilters.search.trim();
    params.page  = activeFilters.page;
    params.limit = activeFilters.limit;
    params.sort  = activeFilters.sort;

    try {
      setLoading(true);
      setError(null);
      const res = await algorithmAPI.getAll(params);
      setAlgorithms(res.data?.algorithms || []);
      setPagination(res.data?.pagination || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  return (
    <AlgorithmContext.Provider
      value={{
        algorithms,
        selectedAlgorithm,
        setSelectedAlgorithm,
        loading,
        error,
        pagination,
        filters,
        fetchAlgorithms,
        updateFilters,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithmContext = () => {
  const ctx = useContext(AlgorithmContext);
  if (!ctx) throw new Error('useAlgorithmContext must be used within AlgorithmProvider');
  return ctx;
};

export default AlgorithmContext;
