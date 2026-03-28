import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createThread, createPost } from '../services/forumService';

const ForumNewThread = () => {
  const { id: categoryId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    setError('');

    const { data: thread, error: threadError } = await createThread({
      title,
      category_id: parseInt(categoryId),
      author_id: user.id
    });
    if (threadError) {
      setError(threadError);
      setSubmitting(false);
      return;
    }

    const { error: postError } = await createPost({
      content,
      thread_id: thread.id,
      author_id: user.id
    });
    if (postError) {
      setError(postError);
    } else {
      navigate(`/forum/thread/${thread.id}`);
    }
    setSubmitting(false);
  };

  return (
    <div className="new-thread-page">
      <h1>Start a New Thread</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="content">Message</label>
          <textarea id="content" rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? 'Creating...' : 'Create Thread'}
        </button>
      </form>
    </div>
  );
};

export default ForumNewThread;