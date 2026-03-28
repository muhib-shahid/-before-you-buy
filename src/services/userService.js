import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getUserProfile = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/profiles`);
    url.searchParams.append('id', `eq.${userId}`);
    const data = await fetchWithToken(url.toString());
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getUserReviews = async (userId) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/reviews`);
    url.searchParams.append('user_id', `eq.${userId}`);
    url.searchParams.append('select', '*,profiles(username,avatar_url)');
    url.searchParams.append('order', 'created_at.desc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getUserStats = async (userId) => {
  // Use supabase client (aggregates, not on initial load)
  const [reviews, comments, guides] = await Promise.all([
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('guides').select('*', { count: 'exact', head: true }).eq('author_id', userId),
  ]);
  return {
    data: {
      reviews: reviews.count || 0,
      comments: comments.count || 0,
      guides: guides.count || 0,
    },
    error: null,
  };
};

export const getUserActivity = async (userId) => {
  // Use supabase client (complex, not on initial load)
  const [reviews, comments, guides, posts] = await Promise.all([
    supabase.from('reviews').select('*, profiles(username)').eq('user_id', userId).limit(10),
    supabase.from('comments').select('*, profiles(username)').eq('user_id', userId).limit(10),
    supabase.from('guides').select('*, author:profiles(username)').eq('author_id', userId).limit(10),
    supabase.from('forum_posts').select('*, author:profiles(username)').eq('author_id', userId).limit(10),
  ]);

  const activities = [];
  if (reviews.data) activities.push(...reviews.data.map(r => ({ id: `review-${r.id}`, type: 'review', content: `Reviewed a game: "${r.content.substring(0, 50)}..."`, created_at: r.created_at })));
  if (comments.data) activities.push(...comments.data.map(c => ({ id: `comment-${c.id}`, type: 'comment', content: `Commented: "${c.content.substring(0, 50)}..."`, created_at: c.created_at })));
  if (guides.data) activities.push(...guides.data.map(g => ({ id: `guide-${g.id}`, type: 'guide', content: `Published a guide: "${g.title}"`, created_at: g.created_at })));
  if (posts.data) activities.push(...posts.data.map(p => ({ id: `post-${p.id}`, type: 'forum', content: `Posted in forum: "${p.content.substring(0, 50)}..."`, created_at: p.created_at })));

  activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return { data: activities.slice(0, 20), error: null };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return { data, error: null };
};