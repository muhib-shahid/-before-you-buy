import { Link } from 'react-router-dom';
// import './GuideCard.css';

const GuideCard = ({ guide }) => {
  return (
    <div className="guide-card">
      <Link to={`/guide/${guide.id}`}>
        <h3>{guide.title}</h3>
      </Link>
      <p>by {guide.author?.username || 'Anonymous'}</p>
      <p className="guide-summary">{guide.summary || guide.content.substring(0, 100)}...</p>
    </div>
  );
};

export default GuideCard;