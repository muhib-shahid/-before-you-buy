// import './ActivityFeed.css';

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <p>No recent activity.</p>;
  }
  return (
    <div className="activity-feed">
      {activities.map(activity => (
        <div key={activity.id} className="activity-item">
          <span className="activity-type">{activity.type}</span>
          <p>{activity.content}</p>
          <small>{new Date(activity.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;