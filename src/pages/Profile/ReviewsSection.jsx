import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserReviews } from '../../services/reviewService';
import ReviewItem from '../../components/reviews/ReviewItem';
// import './ReviewsSection.css';

const ReviewsSection = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchReviews = async () => {
      const { data, error } = await getUserReviews(user.id);
      setLoading(false);
      if (error) setError(error);
      else setReviews(data || []);
    };
    fetchReviews();
  }, [user]);

  if (loading) return <div className="loading-spinner">Loading reviews...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reviews-section">
      <h2><i className="fas fa-star"></i> My Reviews</h2>
      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => <ReviewItem key={review.id} review={review} />)}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;