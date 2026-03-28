import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getThreadById, getPostsByThread, createPost } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
// import './ForumThread.css';

const ForumThreadPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [threadRes, postsRes] = await Promise.all([
        getThreadById(id),
        getPostsByThread(id)
      ]);
      if (threadRes.error) setError(threadRes.error);
      else setThread(threadRes.data);
      if (postsRes.error) setError(postsRes.error);
      else setPosts(postsRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newPost.trim()) return;
    const { data, error } = await createPost({
      content: newPost,
      thread_id: parseInt(id),
      author_id: user.id
    });
    if (error) {
      alert(error);
    } else {
      setPosts([...posts, data]);
      setNewPost('');
    }
  };

  if (loading) return <div className="loading-spinner">Loading thread...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!thread) return <div className="error-message">Thread not found</div>;

  return (
    <div className="forum-thread-page">
      <h1>{thread.title}</h1>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="forum-post">
            <div className="post-header">
              <span className="post-author">{post.author?.username || 'Anonymous'}</span>
              <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
            </div>
            <div className="post-content">{post.content}</div>
          </div>
        ))}
      </div>
      {user && (
        <form onSubmit={handlePostSubmit} className="reply-form">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <button type="submit">Post Reply</button>
        </form>
      )}
    </div>
  );
};

export default ForumThreadPage;