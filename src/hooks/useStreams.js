import { useState, useEffect } from 'react';
import { getStreams } from '../services/streamService';

export const useStreams = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      const { data, error } = await getStreams();
      setLoading(false);
      if (error) setError(error);
      else setStreams(data || []);
    };
    fetchStreams();
  }, []);

  return { streams, loading, error };
};