import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getNews = async (filters = {}) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/news`);
    if (filters.category) url.searchParams.append('category', `eq.${filters.category}`);
    if (filters.limit) url.searchParams.append('limit', filters.limit);
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getNewsById = async (id) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/news`);
    url.searchParams.append('id', `eq.${id}`);
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createNews = async (newsData) => {
  const { data, error } = await supabase.from('news').insert([newsData]).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const updateNews = async (id, newsData) => {
  const { data, error } = await supabase.from('news').update(newsData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const deleteNews = async (id) => {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};