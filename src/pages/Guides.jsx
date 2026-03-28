import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGuides, deleteGuide } from '../services/guideService';
import { useAuth } from '../context/AuthContext';
// import './Guides.css';

const Guides = () => {
  const { user, isAdmin } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuides = async () => {
      const { data, error } = await getGuides();
      setLoading(false);
      if (error) setError(error);
      else setGuides(data || []);
    };
    fetchGuides();
  }, []);

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