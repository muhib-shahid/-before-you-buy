import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getReviewsByGame = async (gameId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/reviews`);
    url.searchParams.append('game_id', `eq.${gameId}`);
    url.searchParams.append('select', '*,profiles(username,avatar_url)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const addReview = async (review) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select('*, profiles(username, avatar_url)')
    .single();
  if (error) throw error;
  return { data, error: null };
};

export const getUserReviews = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/reviews`);
    url.searchParams.append('user_id', `eq.${userId}`);
    url.searchParams.append('select', '*,profiles(username,avatar_url)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};