import CommentItem from './CommentItem';
// import './CommentList.css';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet.</p>;
  }
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;