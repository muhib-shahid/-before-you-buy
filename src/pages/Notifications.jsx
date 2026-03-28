import { useNotifications } from '../context/NotificationContext';
import NotificationList from '../components/notifications/NotificationList';
// import './Notifications.css';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="notifications-page">
      <h1><i className="fas fa-bell"></i> Notifications</h1>
      <NotificationList
        notifications={notifications}
        onMarkRead={markAsRead}
      />
    </div>
  );
};

export default Notifications;