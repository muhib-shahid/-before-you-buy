import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getUserProfiles } from '../services/hardwareService';

export const useHardwareProfiles = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }
    const fetchProfiles = async () => {
      setLoading(true);
      const { data, error } = await getUserProfiles(user.id);
      setLoading(false);
      if (error) setError(error);
      else setProfiles(data || []);
    };
    fetchProfiles();
  }, [user]);

  return { profiles, loading, error, setProfiles };
};