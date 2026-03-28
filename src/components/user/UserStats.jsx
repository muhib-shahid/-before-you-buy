// import './UserStats.css';

const UserStats = ({ stats }) => {
  return (
    <div className="user-stats">
      <div className="stat">
        <span className="stat-value">{stats?.reviews || 0}</span>
        <span className="stat-label">Reviews</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats?.comments || 0}</span>
        <span className="stat-label">Comments</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats?.guides || 0}</span>
        <span className="stat-label">Guides</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats?.followers || 0}</span>
        <span className="stat-label">Followers</span>
      </div>
    </div>
  );
};

export default UserStats;