import { useState, useEffect } from 'react';
import { getGuides, createGuide, updateGuide, deleteGuide } from '../../services/guideService';
import { getGames } from '../../services/gameService';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
// import './GuidesManagement.css';

const AdminGuides = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    game_id: '',
    author_id: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [guidesRes, gamesRes] = await Promise.all([
      getGuides(),
      getGames()
    ]);
    if (guidesRes.error) setError(guidesRes.error);
    else setGuides(guidesRes.data || []);
    if (gamesRes.error) console.error(gamesRes.error);
    else setGames(gamesRes.data || []);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editingGuide
      ? await updateGuide(editingGuide.id, formData)
      : await createGuide(formData);
    if (result.error) alert(result.error);
    else {
      setShowModal(false);
      setEditingGuide(null);
      setFormData({ title: '', content: '', summary: '', game_id: '', author_id: '' });
      loadData();
    }
  };

  const handleEdit = (guide) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      content: guide.content,
      summary: guide.summary || '',
      game_id: guide.game_id || '',
      author_id: guide.author_id || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this guide?')) {
      const { error } = await deleteGuide(id);
      if (error) alert(error);
      else loadData();
    }
  };

  if (loading) return <div className="loading-spinner">Loading guides...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-guides">
      <h1><i className="fas fa-book"></i> Guides Management</h1>
      <button className="btn-primary" onClick={() => { setEditingGuide(null); setFormData({ title: '', content: '', summary: '', game_id: '', author_id: '' }); setShowModal(true); }}>
        <i className="fas fa-plus"></i> Add New Guide
      </button>

      <table className="guides-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Game</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map(guide => (
            <tr key={guide.id}>
              <td>{guide.title}</td>
              <td>{guide.game?.title || '-'}</td>
              <td>{guide.author?.username || '-'}</td>
              <td>{new Date(guide.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(guide)}><i className="fas fa-edit"></i> Edit</button>
                <button onClick={() => handleDelete(guide.id)} className="delete"><i className="fas fa-trash-alt"></i> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingGuide ? 'Edit Guide' : 'Add New Guide'}>
        <form onSubmit={handleSubmit} className="guide-form">
          <div className="form-group">
            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Game (optional)</label>
            <select name="game_id" value={formData.game_id} onChange={handleChange}>
              <option value="">None</option>
              {games.map(game => (
                <option key={game.id} value={game.id}>{game.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea name="content" rows="8" value={formData.content} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label>Author ID (optional)</label>
            <input type="text" name="author_id" value={formData.author_id} onChange={handleChange} />
            <small>Leave empty to use current user</small>
          </div>
          <button type="submit" className="btn-primary">{editingGuide ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminGuides;