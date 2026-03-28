import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getThreadsByCategory, deleteThread } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
// import './ForumCategory.css';

const ForumCategoryPage = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      const { data, error } = await getThreadsByCategory(id);
      setLoading(false);
      if (error) setError(error);
      else setThreads(data || []);
    };
    fetchThreads();
  }, [id]);

  const handleDeleteThread = async (threadId) => {
    if (window.confirm('Delete this thread? All posts will be lost.')) {
      const { error } = await deleteThread(threadId);
      if (error) alert(error);
      else setThreads(threads.filter(t => t.id !== threadId));
    }
  };

  if (loading) return <div className="loading-spinner">Loading threads...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="forum-category-page">
      <h1>Category</h1>
      {user && (
        <Link to={`/forum/category/${id}/new`} className="btn-primary">
          <i className="fas fa-plus"></i> Start New Thread
        </Link>
      )}
      <div className="threads-list">
        {threads.map(thread => (
          <div key={thread.id} className="forum-thread">
            <Link to={`/forum/thread/${thread.id}`}>
              <h4>{thread.title}</h4>
            </Link>
            <p>by {thread.author?.username || 'Anonymous'} on {new Date(thread.created_at).toLocaleDateString()}</p>
            <span className="reply-count">{thread.reply_count || 0} replies</span>
            {(isAdmin || (user && user.id === thread.author_id)) && (
              <button onClick={() => handleDeleteThread(thread.id)} className="delete-thread">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumCategoryPage;