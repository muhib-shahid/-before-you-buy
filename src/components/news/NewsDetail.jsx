// import './NewsDetail.css';

const NewsDetail = ({ news }) => {
  const date = new Date(news.created_at).toLocaleDateString();
  return (
    <div className="news-detail">
      <h1>{news.title}</h1>
      <p className="news-meta">Published on {date}</p>
      <div className="news-content">
        {news.content}
      </div>
    </div>
  );
};

export default NewsDetail;