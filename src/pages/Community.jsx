import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getForumCategories, deleteCategory, createCategory, updateCategory } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';

const Community = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', slug: '' });
  const [inputValue, setInputValue] = useState(() => searchParams.get('search') || '');
  const [sortOrder, setSortOrder] = useState(() => searchParams.get('sort') || 'asc');
  const isFirstRender = useRef(true);

  const urlSearch = searchParams.get('search') || '';
  const urlSort = searchParams.get('sort') || 'asc';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      filters.sort = urlSort;
      const { data, error } = await getForumCategories(filters);
      setLoading(false);
      if (error) setError(error);
      else setCategories(data || []);
    };
    fetchCategories();
  }, [urlSearch, urlSort]);

  // Sync input with URL (external changes)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setInputValue(urlSearch);
  }, [urlSearch]);

  // Update URL when sort changes
  useEffect(() => {
    if (isFirstRender.current) return;
    const newParams = new URLSearchParams();
    if (inputValue.trim()) newParams.set('search', inputValue.trim());
    if (sortOrder !== 'asc') newParams.set('sort', sortOrder);
    setSearchParams(newParams);
  }, [sortOrder]);

  const commitSearch = () => {
    const newSearch = inputValue.trim();
    const newParams = new URLSearchParams();
    if (newSearch) newParams.set('search', newSearch);
    if (sortOrder !== 'asc') newParams.set('sort', sortOrder);
    setSearchParams(newParams);
  };

  const handleBlur = () => commitSearch();
  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); commitSearch(); } };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    const newParams = new URLSearchParams();
    if (inputValue.trim()) newParams.set('search', inputValue.trim());
    if (newSort !== 'asc') newParams.set('sort', newSort);
    setSearchParams(newParams);
  };

  const generateSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'name') {
        const autoSlug = generateSlug(value);
        if (!prev.slug || prev.slug === generateSlug(prev.name)) {
          newData.slug = autoSlug;
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let slugToSubmit = formData.slug.trim();
    if (!slugToSubmit && formData.name.trim()) {
      slugToSubmit = generateSlug(formData.name);
    }
    const finalData = { ...formData, slug: slugToSubmit };
    try {
      if (editing) {
        await updateCategory(editing.id, finalData);
      } else {
        await createCategory(finalData);
      }
      setShowModal(false);
      setEditing(null);
      setFormData({ name: '', description: '', slug: '' });
      // Refetch categories
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      filters.sort = urlSort;
      const { data, error } = await getForumCategories(filters);
      if (error) setError(error);
      else setCategories(data || []);
    } catch (err) {
      alert(err.message || 'Failed to save category');
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setFormData({ name: cat.name, description: cat.description || '', slug: cat.slug });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category and all its threads/posts? This cannot be undone.')) return;
    try {
      await deleteCategory(id);
      // Refetch categories
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      filters.sort = urlSort;
      const { data, error } = await getForumCategories(filters);
      if (error) setError(error);
      else setCategories(data || []);
    } catch (err) {
      alert(err.message || 'Failed to delete category');
    }
  };

  if (loading) return <div className="loading-spinner">Loading forums...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="community-page">
      <h1><i className="fas fa-comments"></i> Community Forums</h1>
      <div className="game-filters">
        <input
          type="text"
          placeholder="Search categories..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="filter-input"
        />
        <select value={sortOrder} onChange={handleSortChange} className="filter-select">
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>
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
            <label>Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="auto‑generated from name" />
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