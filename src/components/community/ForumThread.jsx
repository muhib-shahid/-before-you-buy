import { Link } from 'react-router-dom';
// import './ForumThread.css';

const ForumThread = ({ thread }) => {
  const date = new Date(thread.created_at).toLocaleDateString();
  return (
    <div className="forum-thread">
      <Link to={`/forum/thread/${thread.id}`}>
        <h4>{thread.title}</h4>
      </Link>
      <p>by {thread.author?.username || 'Anonymous'} on {date}</p>
      <span className="reply-count">{thread.reply_count || 0} replies</span>
    </div>
  );
};

export default ForumThread;