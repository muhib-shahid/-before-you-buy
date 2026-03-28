import { useState, useEffect } from 'react';
import { getAllUsers, toggleUserAdmin, deleteUser } from '../../services/adminService';
import UserTable from '../../components/admin/UserTable';
// import './Users.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await getAllUsers();
      setLoading(false);
      if (error) setError(error);
      else setUsers(data || []);
    };
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (userId) => {
    const { error } = await toggleUserAdmin(userId, true);
    if (error) {
      alert(error);
    } else {
      setUsers(users.map(u => u.id === userId ? { ...u, is_admin: true } : u));
    }
  };

  const handleBan = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const { error } = await deleteUser(userId);
      if (error) {
        alert(error);
      } else {
        setUsers(users.filter(u => u.id !== userId));
      }
    }
  };

  if (loading) return <div className="loading-spinner">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-users">
      <h1><i className="fas fa-users"></i> Manage Users</h1>
      <UserTable
        users={users}
        onMakeAdmin={handleMakeAdmin}
        onBan={handleBan}
      />
    </div>
  );
};

export default AdminUsers;