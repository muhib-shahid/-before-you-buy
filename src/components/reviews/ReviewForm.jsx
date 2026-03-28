import { useState } from 'react';
// import './ReviewForm.css';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, content });
    setContent('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rating-select"
        >
          {[1,2,3,4,5].map(r => (
            <option key={r} value={r}>{r} star{r !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="content">Review</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          required
          rows="4"
        />
      </div>
      <button type="submit" className="btn-primary">Submit Review</button>
    </form>
  );
};

export default ReviewForm;