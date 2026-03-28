import { useState, useEffect } from 'react';
import { getEvents } from '../services/calendarService';
// import './Calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await getEvents();
      setLoading(false);
      if (error) setError(error);
      else setEvents(data || []);
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="loading-spinner">Loading calendar...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="calendar-page">
      <h1><i className="fas fa-calendar-alt"></i> Upcoming Events</h1>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className={`event-item ${event.event_type}`}>
            <span className="event-date">
              <i className="fas fa-calendar-day"></i> {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="event-title">{event.title}</span>
            <span className="event-type">{event.event_type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;