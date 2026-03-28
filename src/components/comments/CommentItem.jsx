const CommentItem = ({ comment }) => {
  const date = new Date(comment.created_at).toLocaleString();
  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">
          <i className="fas fa-user-circle"></i> {comment.profiles?.username || 'Anonymous'}
        </span>
        <span className="comment-date">
          <i className="fas fa-clock"></i> {date}
        </span>
      </div>
      <p className="comment-content">{comment.content}</p>
    </div>
  );
};

export default CommentItem;