import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReviewsByGame, addReview } from '../../services/reviewService';
import { getCommentsByGame, addComment, subscribeToComments } from '../../services/commentService';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm';
import CommentList from '../../components/comments/CommentList';
import CommentForm from '../../components/comments/CommentForm';
// import './CommunitySection.css';

const CommunitySection = ({ gameId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [reviewsRes, commentsRes] = await Promise.all([
        getReviewsByGame(gameId),
        getCommentsByGame(gameId)
      ]);
      if (reviewsRes.error) setError(reviewsRes.error);
      else setReviews(reviewsRes.data || []);
      if (commentsRes.error) setError(commentsRes.error);
      else setComments(commentsRes.data || []);
      setLoading(false);
    };
    loadData();

    const subscription = subscribeToComments(gameId, (newComment) => {
      setComments(prev => [...prev, newComment]);
    });

    return () => subscription.unsubscribe();
  }, [gameId]);

  const handleAddReview = async (reviewData) => {
    if (!user) return;
    const { data, error } = await addReview({
      ...reviewData,
      game_id: gameId,
      user_id: user.id
    });
    if (error) {
      alert(error);
    } else {
      setReviews([data, ...reviews]);
    }
  };

  const handleAddComment = async (content) => {
    if (!user) return;
    const { data, error } = await addComment({
      content,
      game_id: gameId,
      user_id: user.id
    });
    if (error) {
      alert(error);
    } else {
      // data will be added via subscription, but we can also add manually
      setComments(prev => [...prev, data]);
    }
  };

  if (loading) return <div className="loading-spinner">Loading community...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="community-section">
      <h2>Reviews</h2>
      {user ? (
        <ReviewForm onSubmit={handleAddReview} />
      ) : (
        <p>Please <a href="/login">login</a> to write a review.</p>
      )}
      <ReviewList reviews={reviews} />

      <h2>Comments</h2>
      {user ? (
        <CommentForm onSubmit={handleAddComment} />
      ) : (
        <p>Please <a href="/login">login</a> to comment.</p>
      )}
      <CommentList comments={comments} />
    </section>
  );
};

export default CommunitySection;