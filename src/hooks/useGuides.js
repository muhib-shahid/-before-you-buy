import { useState, useEffect } from 'react';
import { getGuides } from '../services/guideService';

export const useGuides = (gameId = null) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      const { data, error } = await getGuides(gameId ? { game_id: gameId } : {});
      setLoading(false);
      if (error) setError(error);
      else setGuides(data || []);
    };
    fetchGuides();
  }, [gameId]);

  return { guides, loading, error };
};