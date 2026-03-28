// import './UserAvatar.css';

const UserAvatar = ({ user, size = 'medium' }) => {
  const avatarUrl = user?.avatar_url || '/images/default-avatar.png';
  return (
    <img
      src={avatarUrl}
      alt={user?.username || 'User'}
      className={`user-avatar ${size}`}
    />
  );
};

export default UserAvatar;