import { supabase } from './supabaseClient';

export const getReports = async () => {
  const { data, error } = await supabase
    .from('reports')
    .select('*, reporter:profiles(username)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data, error: null };
};

export const resolveReport = async (id) => {
  const { data, error } = await supabase
    .from('reports')
    .update({ status: 'resolved', resolved_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return { data, error: null };
};

export const dismissReport = async (id) => {
  const { data, error } = await supabase
    .from('reports')
    .update({ status: 'dismissed', resolved_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return { data, error: null };
};