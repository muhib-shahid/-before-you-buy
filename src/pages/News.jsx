import { useState, useEffect } from 'react';
import { getNews } from '../services/newsService';
import NewsList from '../components/news/NewsList';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const filters = {};
      if (category) filters.category = category;
      const { data, error } = await getNews(filters);
      setLoading(false);
      if (error) setError(error);
      else setNews(data || []);
    };
    fetchNews();
  }, [category]);

  if (loading) return <div className="loading-spinner">Loading news...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="news-page">
      <h1>Gaming News</h1>
      <div className="game-filters">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-input"
        >
          <option value="">All Categories</option>
          <option value="announcement">Announcement</option>
          <option value="patch">Patch</option>
          <option value="sale">Sale</option>
          <option value="rumor">Rumor</option>
          <option value="event">Event</option>
          <option value="review">Review</option>
          <option value="trailer">Trailer</option>
        </select>
      </div>
      <NewsList news={news} />
    </div>
  );
};

export default News;