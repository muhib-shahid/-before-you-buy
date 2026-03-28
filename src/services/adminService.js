import { supabase } from './supabaseClient';

export const getDashboardStats = async () => {
  try {
    const [users, games, reviews] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('games').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true })
    ]);

    return {
      data: {
        totalUsers: users.count || 0,
        totalGames: games.count || 0,
        totalReviews: reviews.count || 0
      },
      error: null
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const toggleUserAdmin = async (userId, makeAdmin) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_admin: makeAdmin })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteUser = async (userId) => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};