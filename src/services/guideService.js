import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getGuides = async (filters = {}) => {
  try {
    // Step 1: if searching by game name, get matching game IDs
    let gameIds = null;
    if (filters.search) {
      const gameUrl = new URL(`${supabaseUrl}/rest/v1/games`);
      gameUrl.searchParams.append('select', 'id');
      gameUrl.searchParams.append('title', `ilike.%${filters.search}%`);
      const gameResponse = await fetchWithToken(gameUrl.toString());
      if (gameResponse && gameResponse.length) {
        gameIds = gameResponse.map(g => g.id).join(',');
      } else {
        return { data: [], error: null };
      }
    }

    // Step 2: fetch guides
    const url = new URL(`${supabaseUrl}/rest/v1/guides`);
    if (gameIds) {
      url.searchParams.append('game_id', `in.(${gameIds})`);
    }
    url.searchParams.append('select', '*,author:profiles(username),game:games(title)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// The rest of the file remains exactly the same (getGuideById, getUserGuides, CRUD)
export const getGuideById = async (id) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/guides`);
    url.searchParams.append('id', `eq.${id}`);
    url.searchParams.append('select', '*,author:profiles(username),game:games(title)');
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getUserGuides = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/guides`);
    url.searchParams.append('author_id', `eq.${userId}`);
    url.searchParams.append('select', '*,author:profiles(username)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createGuide = async (guideData) => {
  const { data, error } = await supabase.from('guides').insert([guideData]).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const updateGuide = async (id, guideData) => {
  const { data, error } = await supabase.from('guides').update(guideData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const deleteGuide = async (id) => {
  const { error } = await supabase.from('guides').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};