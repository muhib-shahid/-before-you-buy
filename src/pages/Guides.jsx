import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getGuides, deleteGuide } from '../services/guideService';
import { useAuth } from '../context/AuthContext';
// import './Guides.css';

const Guides = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(() => searchParams.get('search') || '');
  const isFirstRender = useRef(true);

  const urlSearch = searchParams.get('search') || '';

  // Fetch guides when URL search changes
  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      const { data, error } = await getGuides(filters);
      setLoading(false);
      if (error) setError(error);
      else setGuides(data || []);
    };
    fetchGuides();
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

  const handleDelete = async (id) => {
    if (window.confirm('Delete this guide?')) {
      const { error } = await deleteGuide(id);
      if (error) alert(error);
      else setGuides(guides.filter(g => g.id !== id));
    }
  };

  if (loading) return <div className="loading-spinner">Loading guides...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="guides-page">
      <h1><i className="fas fa-book"></i> Game Guides</h1>
      <div className="game-filters">
        <input
          type="text"
          placeholder="Search guides by game name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="filter-input"
        />
      </div>
      {user && (
        <Link to="/guides/new" className="btn-primary">
          <i className="fas fa-plus"></i> Write a Guide
        </Link>
      )}
      <div className="guides-list">
        {guides.map(guide => (
          <div key={guide.id} className="guide-card">
            <Link to={`/guide/${guide.id}`}>
              <h3>{guide.title}</h3>
            </Link>
            <p>by {guide.author?.username || 'Anonymous'} on {new Date(guide.created_at).toLocaleDateString()}</p>
            <p className="guide-summary">{guide.summary || guide.content.substring(0, 100)}...</p>
            {(isAdmin || (user && user.id === guide.author_id)) && (
              <div className="guide-actions">
                <Link to={`/guide/${guide.id}/edit`} className="edit-link">Edit</Link>
                <button onClick={() => handleDelete(guide.id)} className="delete">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;