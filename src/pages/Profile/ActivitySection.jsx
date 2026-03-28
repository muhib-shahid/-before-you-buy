import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserActivity } from '../../services/userService';
import ActivityFeed from '../../components/user/ActivityFeed';
// import './ActivitySection.css';

const ActivitySection = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchActivity = async () => {
      const { data, error } = await getUserActivity(user.id);
      setLoading(false);
      if (error) setError(error);
      else setActivities(data || []);
    };
    fetchActivity();
  }, [user]);

  if (loading) return <div className="loading-spinner">Loading activity...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="activity-section">
      <h2><i className="fas fa-clock"></i> Recent Activity</h2>
      <ActivityFeed activities={activities} />
    </div>
  );
};

export default ActivitySection;