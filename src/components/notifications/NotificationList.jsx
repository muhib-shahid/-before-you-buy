import NotificationItem from './NotificationItem';
// import './NotificationList.css';

const NotificationList = ({ notifications, onMarkRead }) => {
  if (notifications.length === 0) {
    return <p className="no-notifications">No notifications.</p>;
  }
  return (
    <ul className="notification-list">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
        />
      ))}
    </ul>
  );
};

export default NotificationList;