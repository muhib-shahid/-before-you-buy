import { useState, useEffect } from 'react';
import { getNews } from '../services/newsService';
import NewsList from '../components/news/NewsList';
// import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await getNews();
      setLoading(false);
      if (error) setError(error);
      else setNews(data || []);
    };
    fetchNews();
  }, []);

  if (loading) return <div className="loading-spinner">Loading news...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="news-page">
      <h1>Gaming News</h1>
      <NewsList news={news} />
    </div>
  );
};

export default News;