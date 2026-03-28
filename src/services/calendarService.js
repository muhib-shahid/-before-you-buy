import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const getEvents = async (startDate, endDate) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/calendar_events`);
    if (startDate) url.searchParams.append('date', `gte.${startDate}`);
    if (endDate) url.searchParams.append('date', `lte.${endDate}`);
    url.searchParams.append('order', 'date.asc');
    const data = await fetchWithToken(url.toString());
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const createEvent = async (eventData) => {
  const { data, error } = await supabase.from('calendar_events').insert([eventData]).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const updateEvent = async (id, eventData) => {
  const { data, error } = await supabase.from('calendar_events').update(eventData).eq('id', id).select().single();
  if (error) throw error;
  return { data, error: null };
};

export const deleteEvent = async (id) => {
  const { error } = await supabase.from('calendar_events').delete().eq('id', id);
  if (error) throw error;
  return { error: null };
};