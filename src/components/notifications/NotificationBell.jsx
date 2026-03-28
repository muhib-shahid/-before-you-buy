import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
// import './NotificationBell.css';

const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  return (
    <Link to="/notifications" className="notification-bell">
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </Link>
  );
};

export default NotificationBell;