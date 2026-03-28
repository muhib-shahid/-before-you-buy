import { useState, useEffect } from 'react';
import { getStreams, createStream, updateStream, deleteStream } from '../../services/streamService';
import Modal from '../../components/common/Modal';
// import './StreamsManagement.css';

const AdminStreams = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    streamer_name: '',
    platform: 'Twitch',
    viewer_count: 0,
    thumbnail_url: '',
    game_id: '',
    is_live: true
  });

  useEffect(() => { fetchStreams(); }, []);

  const fetchStreams = async () => {
    const { data, error } = await getStreams();
    setLoading(false);
    if (error) setError(error);
    else setStreams(data || []);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editing
      ? await updateStream(editing.id, formData)
      : await createStream(formData);
    if (result.error) alert(result.error);
    else {
      setShowModal(false);
      setEditing(null);
      setFormData({ title: '', streamer_name: '', platform: 'Twitch', viewer_count: 0, thumbnail_url: '', game_id: '', is_live: true });
      fetchStreams();
    }
  };

  const handleEdit = (stream) => {
    setEditing(stream);
    setFormData({
      title: stream.title,
      streamer_name: stream.streamer_name,
      platform: stream.platform,
      viewer_count: stream.viewer_count,
      thumbnail_url: stream.thumbnail_url || '',
      game_id: stream.game_id || '',
      is_live: stream.is_live
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this stream?')) {
      const { error } = await deleteStream(id);
      if (error) alert(error);
      else fetchStreams();
    }
  };

  if (loading) return <div className="loading-spinner">Loading streams...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-streams">
      <h1><i className="fas fa-video"></i> Streams Management</h1>
      <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ title: '', streamer_name: '', platform: 'Twitch', viewer_count: 0, thumbnail_url: '', game_id: '', is_live: true }); setShowModal(true); }}>
        <i className="fas fa-plus"></i> Add New Stream
      </button>

      <table className="streams-table">
        <thead>
          <tr><th>Title</th><th>Streamer</th><th>Platform</th><th>Viewers</th><th>Live</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {streams.map(stream => (
            <tr key={stream.id}>
              <td>{stream.title}</td>
              <td>{stream.streamer_name}</td>
              <td>{stream.platform}</td>
              <td>{stream.viewer_count}</td>
              <td>{stream.is_live ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(stream)}>Edit</button>
                <button onClick={() => handleDelete(stream.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Stream' : 'Add New Stream'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Title *</label><input type="text" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="form-group"><label>Streamer Name *</label><input type="text" name="streamer_name" value={formData.streamer_name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Platform</label><select name="platform" value={formData.platform} onChange={handleChange}><option>Twitch</option><option>YouTube</option><option>Kick</option></select></div>
          <div className="form-group"><label>Viewer Count</label><input type="number" name="viewer_count" value={formData.viewer_count} onChange={handleChange} /></div>
          <div className="form-group"><label>Thumbnail URL</label><input type="url" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} /></div>
          <div className="form-group"><label>Game ID (optional)</label><input type="number" name="game_id" value={formData.game_id} onChange={handleChange} /></div>
          <div className="form-group checkbox">
            <input type="checkbox" name="is_live" checked={formData.is_live} onChange={(e) => setFormData({ ...formData, is_live: e.target.checked })} />
            <label>Live now</label>
          </div>
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminStreams;