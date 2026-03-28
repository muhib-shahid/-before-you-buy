// import './ReviewItem.css';

const ReviewItem = ({ review }) => {
  const date = new Date(review.created_at).toLocaleDateString();
  const username = review.profiles?.username || 'Anonymous';
  const ratingStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-author">{username}</span>
        <span className="review-rating">{ratingStars}</span>
        <span className="review-date">{date}</span>
      </div>
      <p className="review-content">{review.content}</p>
    </div>
  );
};

export default ReviewItem;