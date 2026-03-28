import { Link } from 'react-router-dom';
// import './NewsCard.css';

const NewsCard = ({ news }) => {
  const date = new Date(news.created_at).toLocaleDateString();
  return (
    <div className="news-card">
      <Link to={`/news/${news.id}`}>
        <h3>{news.title}</h3>
      </Link>
      <p className="news-summary">{news.summary || news.content.substring(0, 100)}...</p>
      <span className="news-date">{date}</span>
    </div>
  );
};

export default NewsCard;