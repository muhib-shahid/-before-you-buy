// import './NotificationItem.css';

const NotificationItem = ({ notification, onMarkRead }) => {
  const handleClick = () => {
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }
  };

  return (
    <div
      className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <p>{notification.content}</p>
      <small>{new Date(notification.created_at).toLocaleString()}</small>
    </div>
  );
};

export default NotificationItem;