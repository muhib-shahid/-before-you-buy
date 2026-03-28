import { useState, useEffect } from 'react';
import { getReviewsByGame } from '../services/reviewService';

export const useReviews = (gameId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;
    const fetchReviews = async () => {
      setLoading(true);
      const { data, error } = await getReviewsByGame(gameId);
      setLoading(false);
      if (error) setError(error);
      else setReviews(data || []);
    };
    fetchReviews();
  }, [gameId]);

  return { reviews, loading, error, setReviews };
};