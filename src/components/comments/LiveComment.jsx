// import './LiveComment.css';

const LiveComment = ({ comment }) => {
  const date = new Date(comment.created_at).toLocaleTimeString();
  return (
    <div className="live-comment">
      <span className="comment-author">{comment.profiles?.username || 'Anonymous'}</span>
      <span className="comment-time">{date}</span>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default LiveComment;