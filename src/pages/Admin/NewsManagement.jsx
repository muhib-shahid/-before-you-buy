import { useState, useEffect } from 'react';
import { getNews, createNews, updateNews, deleteNews } from '../../services/newsService';
import Modal from '../../components/common/Modal';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', summary: '', category: '', image_url: '' });

  useEffect(() => { loadNews(); }, []);

  const loadNews = async () => {
    const { data, error } = await getNews();
    setLoading(false);
    if (!error) setNews(data || []);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editing
      ? await updateNews(editing.id, formData)
      : await createNews(formData);
    if (result.error) alert(result.error);
    else {
      setShowModal(false);
      setEditing(null);
      setFormData({ title: '', content: '', summary: '', category: '', image_url: '' });
      loadNews();
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData({
      title: item.title,
      content: item.content,
      summary: item.summary || '',
      category: item.category || '',
      image_url: item.image_url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this news article?')) {
      const { error } = await deleteNews(id);
      if (error) alert(error);
      else loadNews();
    }
  };

  if (loading) return <div className="loading-spinner">Loading news...</div>;

  return (
    <div className="admin-news">
      <h1><i className="fas fa-newspaper"></i> News Management</h1>
      <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ title: '', content: '', summary: '', category: '', image_url: '' }); setShowModal(true); }}>
        <i className="fas fa-plus"></i> Add News
      </button>
      <table className="news-table">
        <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {news.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category || '-'}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit News' : 'Add News'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Title *</label><input type="text" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="form-group"><label>Summary</label><input type="text" name="summary" value={formData.summary} onChange={handleChange} /></div>
          <div className="form-group"><label>Category</label><input type="text" name="category" value={formData.category} onChange={handleChange} /></div>
          <div className="form-group"><label>Image URL</label><input type="url" name="image_url" value={formData.image_url} onChange={handleChange} /></div>
          <div className="form-group"><label>Content *</label><textarea name="content" rows="8" value={formData.content} onChange={handleChange} required></textarea></div>
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminNews;