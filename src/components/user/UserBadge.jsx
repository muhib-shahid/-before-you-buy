// import './UserBadge.css';

const UserBadge = ({ user, showAvatar = false }) => {
  return (
    <div className="user-badge">
      {showAvatar && <img src={user?.avatar_url || '/images/default-avatar.png'} alt="" />}
      <span>{user?.username || 'Anonymous'}</span>
    </div>
  );
};

export default UserBadge;