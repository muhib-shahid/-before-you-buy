import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import './Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard">
      <h1><i className="fas fa-tachometer-alt"></i> Admin Dashboard</h1>
      <p>Welcome back, {user?.email}</p>

      <div className="admin-nav-grid">
        <Link to="/admin/users" className="admin-card">
          <i className="fas fa-users"></i>
          <h3>Users</h3>
          <p>Manage user accounts and permissions</p>
        </Link>
        <Link to="/admin/games" className="admin-card">
          <i className="fas fa-gamepad"></i>
          <h3>Games</h3>
          <p>Add, edit, or remove games</p>
        </Link>
        <Link to="/admin/deals" className="admin-card">
          <i className="fas fa-tags"></i>
          <h3>Deals</h3>
          <p>Manage active deals and discounts</p>
        </Link>
        <Link to="/admin/news" className="admin-card">
          <i className="fas fa-newspaper"></i>
          <h3>News</h3>
          <p>Post and manage news articles</p>
        </Link>
        <Link to="/admin/guides" className="admin-card">
          <i className="fas fa-book"></i>
          <h3>Guides</h3>
          <p>Approve and manage user guides</p>
        </Link>
        <Link to="/admin/streams" className="admin-card">
          <i className="fas fa-video"></i>
          <h3>Streams</h3>
          <p>Add or remove live streams</p>
        </Link>
        <Link to="/admin/reports" className="admin-card">
          <i className="fas fa-flag"></i>
          <h3>Reports</h3>
          <p>Handle user reports</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;