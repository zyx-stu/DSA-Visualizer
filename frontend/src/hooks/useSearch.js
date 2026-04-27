import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return {
    searchTerm,
    debouncedSearch,
    handleSearch,
  };
};
