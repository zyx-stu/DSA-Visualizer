import { useState, useEffect } from 'react';
import { algorithmAPI } from '../services/api';

export const useAlgorithms = (initialFilters = {}) => {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchAlgorithms = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await algorithmAPI.getAll({ ...initialFilters, ...filters });
      setAlgorithms(response.data.algorithms);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlgorithms();
  }, []);

  return {
    algorithms,
    loading,
    error,
    pagination,
    refetch: fetchAlgorithms,
  };
};
