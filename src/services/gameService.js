import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getGames = async (filters = {}) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/games`);
    // FIXED: Correct array containment syntax for Supabase
    if (filters.genre) url.searchParams.append('genres', `cs.{"${filters.genre}"}`);
    if (filters.search) url.searchParams.append('title', `ilike.%${filters.search}%`);
    if (filters.limit) url.searchParams.append('limit', filters.limit);
    if (filters.comingSoon) url.searchParams.append('release_date', `gt.${new Date().toISOString().split('T')[0]}`);
    url.searchParams.append('order', 'title.asc');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      const data = await fetchWithToken(url.toString(), { signal: controller.signal });
      return { data, error: null };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error('Game fetch error:', error);
    return { data: null, error: error.message };
  }
};

export const getGameBySlug = async (slug) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/games`);
    url.searchParams.append('slug', `eq.${slug}`);
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// CRUD operations (use supabase client – they're fine)
export const createGame = async (gameData) => {
  const { data, error } = await supabase.from('games').insert([gameData]).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const updateGame = async (id, gameData) => {
  const { data, error } = await supabase.from('games').update(gameData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const deleteGame = async (id) => {
  const { error } = await supabase.from('games').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};