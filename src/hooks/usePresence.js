import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const usePresence = (gameId) => {
  const { user } = useAuth();
  const [viewers, setViewers] = useState([]);

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase.channel(`game-${gameId}`, {
      config: { presence: { key: user?.id || 'anon' } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const userIds = Object.keys(presenceState).map(key => key);
        setViewers(userIds);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: user?.id || 'anon' });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [gameId, user]);

  return viewers;
};