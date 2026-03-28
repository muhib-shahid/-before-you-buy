import { useState, useEffect } from 'react';
import { getGames } from '../services/gameService';

export const useGames = (filters = {}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const { data, error } = await getGames(filters);
      setLoading(false);
      if (error) setError(error);
      else setGames(data || []);
    };
    fetchGames();
  }, [JSON.stringify(filters)]);

  return { games, loading, error };
};