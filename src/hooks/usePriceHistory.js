import { useState, useEffect } from 'react';
import { getPriceHistory } from '../services/priceHistoryService';

export const usePriceHistory = (gameId) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await getPriceHistory(gameId);
      setLoading(false);
      if (error) setError(error);
      else setHistory(data || []);
    };
    fetchHistory();
  }, [gameId]);

  return { history, loading, error };
};