import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createGuide, getGuideById, updateGuide } from '../services/guideService';
import { getGames } from '../services/gameService';

const GuideForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    game_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const [gamesRes] = await Promise.all([getGames()]);
      if (gamesRes.error) console.error(gamesRes.error);
      else setGames(gamesRes.data || []);

      if (id) {
        const { data, error } = await getGuideById(id);
        if (error) setError(error);
        else setFormData({
          title: data.title,
          content: data.content,
          summary: data.summary || '',
          game_id: data.game_id || ''
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    const guideData = {
      ...formData,
      author_id: user.id,
      game_id: formData.game_id ? parseInt(formData.game_id) : null
    };
    const { error } = id
      ? await updateGuide(id, guideData)
      : await createGuide(guideData);
    setSubmitting(false);
    if (error) setError(error);
    else navigate('/guides');
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="guide-form-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {id ? '✏️ Edit Guide' : '📝 Write a New Guide'}
      </h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="input-group">
          <i className="fas fa-heading"></i>
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Summary */}
        <div className="input-group">
          <i className="fas fa-align-left"></i>
          <input
            type="text"
            name="summary"
            placeholder="Short summary (optional)"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        {/* Game selection */}
        <div className="input-group">
          <i className="fas fa-gamepad"></i>
          <select name="game_id" value={formData.game_id} onChange={handleChange}>
            <option value="">🎮 Select related game (optional)</option>
            {games.map(game => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>

        {/* Content (textarea) – special handling to align icon properly */}
        <div className="input-group" style={{ alignItems: 'flex-start' }}>
          <i className="fas fa-file-alt" style={{ marginTop: '12px' }}></i>
          <textarea
            name="content"
            placeholder="Write your guide content here... *"
            rows="12"
            value={formData.content}
            onChange={handleChange}
            required
            style={{ resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {submitting ? 'Saving...' : (id ? 'Update Guide' : 'Publish Guide')}
        </button>
      </form>
    </div>
  );
};

export default GuideForm;