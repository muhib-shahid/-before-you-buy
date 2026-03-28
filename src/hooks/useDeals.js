import { useState, useEffect } from 'react';
import { getDeals } from '../services/dealService';

export const useDeals = (activeOnly = true) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const { data, error } = await getDeals({ activeOnly });
      setLoading(false);
      if (error) setError(error);
      else setDeals(data || []);
    };
    fetchDeals();
  }, [activeOnly]);

  return { deals, loading, error };
};