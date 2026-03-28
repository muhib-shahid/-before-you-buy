import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGuideById } from '../services/guideService';
// import './GuideDetail.css';

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      const { data, error } = await getGuideById(id);
      setLoading(false);
      if (error) setError(error);
      else setGuide(data);
    };
    fetchGuide();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading guide...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!guide) return <div className="error-message">Guide not found</div>;

  return (
    <div className="guide-detail">
      <h1>{guide.title}</h1>
      <p>by {guide.author?.username || 'Anonymous'} on {new Date(guide.created_at).toLocaleDateString()}</p>
      <div className="guide-content">{guide.content}</div>
    </div>
  );
};

export default GuideDetail;