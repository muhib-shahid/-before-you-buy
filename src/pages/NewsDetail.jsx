import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '../services/newsService';
import NewsDetail from '../components/news/NewsDetail';
// import './NewsDetail.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await getNewsById(id);
      setLoading(false);
      if (error) setError(error);
      else setNews(data);
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading article...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!news) return <div className="error-message">Article not found</div>;

  return (
    <div className="news-detail-page">
      <NewsDetail news={news} />
    </div>
  );
};

export default NewsDetailPage;