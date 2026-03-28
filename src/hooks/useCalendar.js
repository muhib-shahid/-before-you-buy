import { useState, useEffect } from 'react';
import { getEvents } from '../services/calendarService';

export const useCalendar = (startDate, endDate) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await getEvents(startDate, endDate);
      setLoading(false);
      if (error) setError(error);
      else setEvents(data || []);
    };
    fetchEvents();
  }, [startDate, endDate]);

  return { events, loading, error };
};