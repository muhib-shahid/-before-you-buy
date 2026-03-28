import NewsCard from './NewsCard';
// import './NewsList.css';

const NewsList = ({ news }) => {
  if (news.length === 0) return <p>No news articles.</p>;
  return (
    <div className="news-list">
      {news.map(item => <NewsCard key={item.id} news={item} />)}
    </div>
  );
};

export default NewsList;