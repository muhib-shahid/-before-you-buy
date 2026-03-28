import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getDashboardStats } from '../services/adminService';

export const useAdminStats = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !isAdmin) {
      setLoading(false);
      return;
    }
    const fetchStats = async () => {
      setLoading(true);
      const { data, error } = await getDashboardStats();
      setLoading(false);
      if (error) setError(error);
      else setStats(data);
    };
    fetchStats();
  }, [user, isAdmin]);

  return { stats, loading, error };
};