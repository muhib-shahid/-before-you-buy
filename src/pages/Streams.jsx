import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getStreams } from '../services/streamService';
import StreamList from '../components/streams/StreamList';
// import './Streams.css';

const Streams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(() => searchParams.get('search') || '');
  const isFirstRender = useRef(true);

  const urlSearch = searchParams.get('search') || '';

  // Fetch streams when URL search changes
  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      const { data, error } = await getStreams(filters);
      setLoading(false);
      if (error) setError(error);
      else setStreams(data || []);
    };
    fetchStreams();
  }, [urlSearch]);

  // Sync input when URL changes externally (e.g., back button)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setInputValue(urlSearch);
  }, [urlSearch]);

  const commitSearch = () => {
    const newSearch = inputValue.trim();
    const newParams = new URLSearchParams();
    if (newSearch) newParams.set('search', newSearch);
    setSearchParams(newParams);
  };

  const handleBlur = () => commitSearch();
  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); commitSearch(); } };

  if (loading) return <div className="loading-spinner">Loading streams...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="streams-page">
      <h1><i className="fas fa-video"></i> Live Streams</h1>
      <div className="game-filters">
        <input
          type="text"
          placeholder="Search streams by game name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="filter-input"
        />
      </div>
      <StreamList streams={streams} />
    </div>
  );
};

export default Streams;