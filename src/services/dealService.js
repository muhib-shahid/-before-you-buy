import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getDeals = async (filters = {}) => {
  try {
    // If search is provided, first get matching game IDs
    let gameIds = null;
    if (filters.search) {
      const gameUrl = new URL(`${supabaseUrl}/rest/v1/games`);
      gameUrl.searchParams.append('select', 'id');
      gameUrl.searchParams.append('title', `ilike.%${filters.search}%`);
      const gameResponse = await fetchWithToken(gameUrl.toString());
      if (gameResponse && gameResponse.length) {
        gameIds = gameResponse.map(g => g.id).join(',');
      } else {
        // No matching games -> return empty deals
        return { data: [], error: null };
      }
    }

    const url = new URL(`${supabaseUrl}/rest/v1/deals`);
    if (gameIds) {
      url.searchParams.append('game_id', `in.(${gameIds})`);
    }
    if (filters.store) url.searchParams.append('store', `eq.${filters.store}`);
    if (filters.activeOnly) url.searchParams.append('expires_at', `gt.${new Date().toISOString()}`);
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getDealById = async (id) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/deals`);
    url.searchParams.append('id', `eq.${id}`);
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createDeal = async (dealData) => {
  const { data, error } = await supabase.from('deals').insert([dealData]).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const updateDeal = async (id, dealData) => {
  const { data, error } = await supabase.from('deals').update(dealData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const deleteDeal = async (id) => {
  const { error } = await supabase.from('deals').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};