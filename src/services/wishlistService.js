import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getUserWishlist = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/wishlists`);
    url.searchParams.append('user_id', `eq.${userId}`);
    url.searchParams.append('select', 'game:games(*)');
    const data = await fetchWithToken(url.toString());
    const games = data.map(item => item.game);
    return { data: games, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const addToWishlist = async (userId, gameId) => {
  const { data, error } = await supabase
    .from('wishlists')
    .insert([{ user_id: userId, game_id: gameId }])
    .select();
  if (error) throw error;
  return { data, error: null };
};

export const removeFromWishlist = async (userId, gameId) => {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('game_id', gameId);
  if (error) throw error;
  return { error: null };
};