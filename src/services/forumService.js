import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getForumCategories = async () => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/forum_categories`);
    url.searchParams.append('order', 'name.asc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getThreadsByCategory = async (categoryId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/forum_threads`);
    url.searchParams.append('category_id', `eq.${categoryId}`);
    url.searchParams.append('select', '*,author:profiles(username),category:forum_categories(name)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getThreadById = async (threadId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/forum_threads`);
    url.searchParams.append('id', `eq.${threadId}`);
    url.searchParams.append('select', '*,author:profiles(username),category:forum_categories(name)');
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getPostsByThread = async (threadId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/forum_posts`);
    url.searchParams.append('thread_id', `eq.${threadId}`);
    url.searchParams.append('select', '*,author:profiles(username)');
    url.searchParams.append('order', 'created_at.asc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// CRUD operations (use supabase client)
export const createCategory = async (category) => {
  const { data, error } = await supabase.from('forum_categories').insert([category]).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase.from('forum_categories').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const deleteCategory = async (id) => {
  const { error } = await supabase.from('forum_categories').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};
export const createThread = async (thread) => {
  const { data, error } = await supabase.from('forum_threads').insert([thread]).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const updateThread = async (id, updates) => {
  const { data, error } = await supabase.from('forum_threads').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};
export const deleteThread = async (id) => {
  const { error } = await supabase.from('forum_threads').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};
export const createPost = async (post) => {
  const { data, error } = await supabase.from('forum_posts').insert([post]).select().single();
  if (error) throw error;
  return { data, error: null };
};