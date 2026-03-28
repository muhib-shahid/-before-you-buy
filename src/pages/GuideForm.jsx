import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createGuide, getGuideById, updateGuide } from '../services/guideService';
import { getGames } from '../services/gameService';

const GuideForm = () => {
  const { id } = useParams(); // if editing, id is present
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
    <div className="guide-form-page">
      <h1>{id ? 'Edit Guide' : 'Write a New Guide'}</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Summary (optional)</label>
          <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Related Game (optional)</label>
          <select name="game_id" value={formData.game_id} onChange={handleChange}>
            <option value="">None</option>
            {games.map(game => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Content *</label>
          <textarea name="content" rows="12" value={formData.content} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Saving...' : (id ? 'Update' : 'Publish')}
        </button>
      </form>
    </div>
  );
};

export default GuideForm;