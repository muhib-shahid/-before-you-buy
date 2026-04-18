import { fetchWithToken } from '../utils/fetchWithToken';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// ✅ Changed: accepts a filters object instead of two separate dates
export const getEvents = async (filters = {}) => {
  try {
    const url = new URL(`${supabaseUrl}/rest/v1/calendar_events`);
    if (filters.eventType) url.searchParams.append('event_type', `eq.${filters.eventType}`);
    if (filters.startDate) url.searchParams.append('date', `gte.${filters.startDate}`);
    if (filters.endDate) url.searchParams.append('date', `lte.${filters.endDate}`);
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