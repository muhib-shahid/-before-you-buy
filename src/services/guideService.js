import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getGuides = async () => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/guides`);
    url.searchParams.append('select', '*,author:profiles(username),game:games(title)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

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

// CRUD
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