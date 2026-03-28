import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserGuides } from '../../services/guideService';
import GuideCard from '../../components/community/GuideCard';
// import './GuidesSection.css';

const GuidesSection = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchGuides = async () => {
      const { data, error } = await getUserGuides(user.id);
      setLoading(false);
      if (error) setError(error);
      else setGuides(data || []);
    };
    fetchGuides();
  }, [user]);

  if (loading) return <div className="loading-spinner">Loading guides...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="guides-section">
      <h2><i className="fas fa-book"></i> My Guides</h2>
      {guides.length === 0 ? (
        <p>You haven't written any guides yet. <Link to="/guides/new">Write one now!</Link></p>
      ) : (
        <div className="guides-list">
          {guides.map(guide => <GuideCard key={guide.id} guide={guide} />)}
        </div>
      )}
    </div>
  );
};

export default GuidesSection;