import { useState, useEffect } from 'react';
import { getStreams } from '../services/streamService';
import StreamList from '../components/streams/StreamList';
// import './Streams.css';

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreams = async () => {
      const { data, error } = await getStreams();
      setLoading(false);
      if (error) setError(error);
      else setStreams(data || []);
    };
    fetchStreams();
  }, []);

  if (loading) return <div className="loading-spinner">Loading streams...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="streams-page">
      <h1><i className="fas fa-video"></i> Live Streams</h1>
      <StreamList streams={streams} />
    </div>
  );
};

export default Streams;