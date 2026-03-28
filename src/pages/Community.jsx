import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getForumCategories, deleteCategory } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
// import './Community.css';

const Community = () => {
  const { user, isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', slug: '' });

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    const { data, error } = await getForumCategories();
    setLoading(false);
    if (error) setError(error);
    else setCategories(data || []);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editing
      ? await updateCategory(editing.id, formData)
      : await createCategory(formData);
    if (result.error) alert(result.error);
    else {
      setShowModal(false);
      setEditing(null);
      setFormData({ name: '', description: '', slug: '' });
      loadCategories();
    }
  };
  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, description: cat.description || '', slug: cat.slug });
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this category? All threads will be deleted.')) {
      const { error } = await deleteCategory(id);
      if (error) alert(error);
      else loadCategories();
    }
  };

  if (loading) return <div className="loading-spinner">Loading forums...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="community-page">
      <h1><i className="fas fa-comments"></i> Community Forums</h1>
      {isAdmin && (
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ name: '', description: '', slug: '' }); setShowModal(true); }}>
          <i className="fas fa-plus"></i> Add Category
        </button>
      )}
      <div className="categories-list">
        {categories.map(cat => (
          <div key={cat.id} className="forum-category">
            <Link to={`/forum/category/${cat.id}`}>
              <h3>{cat.name}</h3>
            </Link>
            <p>{cat.description}</p>
            {isAdmin && (
              <div className="admin-actions">
                <button onClick={() => handleEdit(cat)}><i className="fas fa-edit"></i> Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="delete"><i className="fas fa-trash-alt"></i> Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Category' : 'New Category'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Slug *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Community;