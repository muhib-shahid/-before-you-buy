import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// ========== READ OPERATIONS ==========
export const getForumCategories = async (filters = {}) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/forum_categories`);
    if (filters.search) {
      url.searchParams.append('or', `(name.ilike.%${filters.search}%,description.ilike.%${filters.search}%)`);
    }
    const sortOrder = filters.sort === 'desc' ? 'name.desc' : 'name.asc';
    url.searchParams.append('order', sortOrder);
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

// ========== CATEGORY CRUD (UUID compatible – no parseInt) ==========
export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from('forum_categories')
    .insert([category])
    .select();
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error('Failed to create category');
  return { data: data[0], error: null };
};

export const updateCategory = async (id, updates) => {
  // id is UUID string – no conversion needed
  const { data: existing, error: fetchError } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);
  if (!existing) throw new Error('Category not found');

  const { data, error } = await supabase
    .from('forum_categories')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    return { data: existing, error: null };
  }
  return { data: data[0], error: null };
};

export const deleteCategory = async (id) => {
  // 1. Get all thread IDs in this category
  const { data: threads, error: threadFetchError } = await supabase
    .from('forum_threads')
    .select('id')
    .eq('category_id', id);
  if (threadFetchError) throw new Error(threadFetchError.message);

  if (threads && threads.length > 0) {
    const threadIds = threads.map(t => t.id);
    // 2. Delete all posts in these threads
    const { error: postsError } = await supabase
      .from('forum_posts')
      .delete()
      .in('thread_id', threadIds);
    if (postsError) throw new Error(postsError.message);
    // 3. Delete all threads
    const { error: threadsError } = await supabase
      .from('forum_threads')
      .delete()
      .in('id', threadIds);
    if (threadsError) throw new Error(threadsError.message);
  }
  // 4. Delete the category
  const { error } = await supabase
    .from('forum_categories')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
  return { error: null };
};

// ========== THREAD & POST CRUD (similar – use UUID as is) ==========
export const createThread = async (thread) => {
  const { data, error } = await supabase
    .from('forum_threads')
    .insert([thread])
    .select();
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error('Failed to create thread');
  return { data: data[0], error: null };
};

export const updateThread = async (id, updates) => {
  const { data: existing, error: fetchError } = await supabase
    .from('forum_threads')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) throw new Error(fetchError.message);
  if (!existing) throw new Error('Thread not found');

  const { data, error } = await supabase
    .from('forum_threads')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) {
    return { data: existing, error: null };
  }
  return { data: data[0], error: null };
};

export const deleteThread = async (id) => {
  const { error: postsError } = await supabase
    .from('forum_posts')
    .delete()
    .eq('thread_id', id);
  if (postsError) throw new Error(postsError.message);
  const { error } = await supabase
    .from('forum_threads')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
  return { error: null };
};

export const createPost = async (post) => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert([post])
    .select();
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error('Failed to create post');
  return { data: data[0], error: null };
};