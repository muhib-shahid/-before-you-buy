import { supabase } from './supabaseClient';

export const getPriceHistory = async (gameId) => {
  try {
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('game_id', gameId)
      .order('date', { ascending: true });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const addPricePoint = async (pricePoint) => {
  try {
    const { data, error } = await supabase
      .from('price_history')
      .insert([pricePoint])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};