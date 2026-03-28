import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getUserProfiles = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/hardware_profiles`);
    url.searchParams.append('user_id', `eq.${userId}`);
    url.searchParams.append('order', 'created_at.desc');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const data = await fetchWithToken(url.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);

    return { data, error: null };
  } catch (error) {
    console.error('Hardware profiles fetch error:', error);
    return { data: null, error: error.message };
  }
};

export const createHardwareProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('hardware_profiles')
      .insert([profileData])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateHardwareProfile = async (id, profileData) => {
  try {
    const { data, error } = await supabase
      .from('hardware_profiles')
      .update(profileData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteHardwareProfile = async (id) => {
  try {
    const { error } = await supabase
      .from('hardware_profiles')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};