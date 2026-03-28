import ReviewItem from './ReviewItem';
// import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="no-reviews">No reviews yet. Be the first to review!</p>;
  }
  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;