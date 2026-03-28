import { useState, useEffect } from 'react';
import { getDeals, createDeal, updateDeal, deleteDeal } from '../../services/dealService';
import Modal from '../../components/common/Modal';
// import './DealsManagement.css';

const AdminDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    store: '',
    game_id: '',
    url: '',
    expires_at: ''
  });

  useEffect(() => { fetchDeals(); }, []);

  const fetchDeals = async () => {
    const { data, error } = await getDeals();
    setLoading(false);
    if (error) setError(error);
    else setDeals(data || []);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editing
      ? await updateDeal(editing.id, formData)
      : await createDeal(formData);
    if (result.error) alert(result.error);
    else {
      setShowModal(false);
      setEditing(null);
      setFormData({ title: '', price: '', store: '', game_id: '', url: '', expires_at: '' });
      fetchDeals();
    }
  };

  const handleEdit = (deal) => {
    setEditing(deal);
    setFormData({
      title: deal.title,
      price: deal.price,
      store: deal.store,
      game_id: deal.game_id || '',
      url: deal.url || '',
      expires_at: deal.expires_at?.split('T')[0] || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this deal?')) {
      const { error } = await deleteDeal(id);
      if (error) alert(error);
      else fetchDeals();
    }
  };

  if (loading) return <div className="loading-spinner">Loading deals...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-deals">
      <h1><i className="fas fa-tags"></i> Deals Management</h1>
      <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ title: '', price: '', store: '', game_id: '', url: '', expires_at: '' }); setShowModal(true); }}>
        <i className="fas fa-plus"></i> Add New Deal
      </button>

      <table className="deals-table">
        <thead>
          <tr><th>Title</th><th>Price</th><th>Store</th><th>Game ID</th><th>Expires</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.title}</td>
              <td>${deal.price}</td>
              <td>{deal.store}</td>
              <td>{deal.game_id || '-'}</td>
              <td>{deal.expires_at ? new Date(deal.expires_at).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(deal)}>Edit</button>
                <button onClick={() => handleDelete(deal.id)} className="delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Deal' : 'Add New Deal'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Title *</label><input type="text" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="form-group"><label>Price *</label><input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required /></div>
          <div className="form-group"><label>Store *</label><input type="text" name="store" value={formData.store} onChange={handleChange} required /></div>
          <div className="form-group"><label>Game ID (optional)</label><input type="number" name="game_id" value={formData.game_id} onChange={handleChange} /></div>
          <div className="form-group"><label>Deal URL</label><input type="url" name="url" value={formData.url} onChange={handleChange} /></div>
          <div className="form-group"><label>Expires At</label><input type="date" name="expires_at" value={formData.expires_at} onChange={handleChange} /></div>
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDeals;