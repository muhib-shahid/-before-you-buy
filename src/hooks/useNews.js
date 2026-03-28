import { useState, useEffect } from 'react';
import { getNews } from '../services/newsService';

export const useNews = (category = null) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await getNews({ category });
      setLoading(false);
      if (error) setError(error);
      else setNews(data || []);
    };
    fetchNews();
  }, [category]);

  return { news, loading, error };
};