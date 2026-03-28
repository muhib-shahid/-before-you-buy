import { useState, useEffect } from 'react';
import { getThreadsByCategory } from '../services/forumService';

export const useForum = (categoryId) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;
    const fetchThreads = async () => {
      setLoading(true);
      const { data, error } = await getThreadsByCategory(categoryId);
      setLoading(false);
      if (error) setError(error);
      else setThreads(data || []);
    };
    fetchThreads();
  }, [categoryId]);

  return { threads, loading, error };
};