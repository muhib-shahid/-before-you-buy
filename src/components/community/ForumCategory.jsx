import { Link } from 'react-router-dom';
// import './ForumCategory.css';

const ForumCategory = ({ category }) => {
  return (
    <div className="forum-category">
      <Link to={`/forum/category/${category.id}`}>
        <h3>{category.name}</h3>
      </Link>
      <p>{category.description}</p>
      <span className="thread-count">{category.thread_count || 0} threads</span>
    </div>
  );
};

export default ForumCategory;