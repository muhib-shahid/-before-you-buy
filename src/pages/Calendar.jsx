import { useState, useEffect } from 'react';
import { getEvents } from '../services/calendarService';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const filters = {};
      if (eventType) filters.eventType = eventType;
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      const { data, error } = await getEvents(filters);
      setLoading(false);
      if (error) setError(error);
      else setEvents(data || []);
    };
    fetchEvents();
  }, [eventType, startDate, endDate]);

  if (loading) return <div className="loading-spinner">Loading calendar...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="calendar-page">
      <h1><i className="fas fa-calendar-alt"></i> Upcoming Events</h1>
      
      <div className="game-filters">
        {/* Event type dropdown */}
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="filter-input"
        >
          <option value="">All Event Types</option>
          <option value="release">Release</option>
          <option value="patch">Patch</option>
          <option value="event">Event</option>
          <option value="announcement">Announcement</option>
          <option value="rumor">Rumor</option>
          <option value="sale">Sale</option>
          <option value="mod">Mod</option>
        </select>

        {/* Start date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="filter-input"
          placeholder="Start date"
        />

        {/* End date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="filter-input"
          placeholder="End date"
        />
      </div>

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