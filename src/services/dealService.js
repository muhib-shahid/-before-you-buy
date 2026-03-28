import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getDeals = async (filters = {}) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/deals`);
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