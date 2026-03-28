import { useState, useEffect } from 'react';
import { getCommentsByGame } from '../services/commentService';

export const useComments = (gameId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;
    const fetchComments = async () => {
      setLoading(true);
      const { data, error } = await getCommentsByGame(gameId);
      setLoading(false);
      if (error) setError(error);
      else setComments(data || []);
    };
    fetchComments();
  }, [gameId]);

  return { comments, loading, error, setComments };
};