import { supabase } from './supabaseClient';

const CUSTOM_STORAGE_KEY = 'auth_data';

export const signUp = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    // Clear custom storage
    localStorage.removeItem(CUSTOM_STORAGE_KEY);
    // Sign out of Supabase (this will also clear its own token)
    await supabase.auth.signOut();
    // Force a full page reload to reset React state completely
    window.location.href = '/';
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    return { session: null, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};