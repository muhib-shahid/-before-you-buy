import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getCommentsByGame = async (gameId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/comments`);
    url.searchParams.append('game_id', `eq.${gameId}`);
    url.searchParams.append('select', '*,profiles(username,avatar_url)');
    url.searchParams.append('order', 'created_at.asc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const addComment = async (comment) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([comment])
    .select('*, profiles(username, avatar_url)')
    .single();
  if (error) throw error;
  return { data, error: null };
};

export const subscribeToComments = (gameId, callback) => {
  return supabase
    .channel(`comments:game_id=eq.${gameId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `game_id=eq.${gameId}`,
      },
      async (payload) => {
        const { data } = await supabase
          .from('comments')
          .select('*, profiles(username, avatar_url)')
          .eq('id', payload.new.id)
          .single();
        if (data) callback(data);
      }
    )
    .subscribe();
};