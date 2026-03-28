import { getAccessToken } from './sessionToken';
import { supabase } from '../services/supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const fetchWithToken = async (url, options = {}) => {
  const token = getAccessToken();
  const headers = {
    apikey: supabaseAnonKey,
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 && !options._retry) {
    console.log('Token expired, refreshing...');
    const { data, error } = await supabase.auth.refreshSession();
    if (!error && data?.session) {
      const newToken = data.session.access_token;
      const newHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
      const retryResponse = await fetch(url, { ...options, headers: newHeaders, _retry: true });
      if (!retryResponse.ok) {
        const errText = await retryResponse.text();
        throw new Error(`HTTP ${retryResponse.status}: ${errText}`);
      }
      return retryResponse.json();
    }
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  return response.json();
};