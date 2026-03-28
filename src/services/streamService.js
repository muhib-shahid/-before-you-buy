import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getStreams = async () => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/streams`);
    url.searchParams.append('order', 'viewer_count.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

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