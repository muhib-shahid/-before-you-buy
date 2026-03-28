import { useEffect } from 'react';
import { subscribeToComments } from '../services/commentService';

export const useRealtimeComments = (gameId, onNewComment) => {
  useEffect(() => {
    if (!gameId) return;
    const subscription = subscribeToComments(gameId, onNewComment);
    return () => subscription.unsubscribe();
  }, [gameId, onNewComment]);
};