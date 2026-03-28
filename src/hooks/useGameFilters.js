import { useState } from 'react';

export const useGameFilters = () => {
  const [filters, setFilters] = useState({});

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return { filters, updateFilters, clearFilters };
};