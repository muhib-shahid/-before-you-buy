import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getStreams = async (filters = {}) => {
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

    // Step 2: fetch streams
    const url = new URL(`${supabaseUrl}/rest/v1/streams`);
    if (gameIds) {
      url.searchParams.append('game_id', `in.(${gameIds})`);
    }
    url.searchParams.append('order', 'viewer_count.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// The rest of the file remains exactly the same (getStreamById, CRUD)
export const getStreamById = async (id) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/streams`);
    url.searchParams.append('id', `eq.${id}`);
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createStream = async (streamData) => {
  const { data, error } = await supabase.from('streams').insert([streamData]).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const updateStream = async (id, streamData) => {
  const { data, error } = await supabase.from('streams').update(streamData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const deleteStream = async (id) => {
  const { error } = await supabase.from('streams').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};