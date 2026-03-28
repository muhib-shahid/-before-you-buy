// import './ForumPost.css';

const ForumPost = ({ post }) => {
  const date = new Date(post.created_at).toLocaleString();
  return (
    <div className="forum-post">
      <div className="post-header">
        <span className="post-author">{post.author?.username || 'Anonymous'}</span>
        <span className="post-date">{date}</span>
      </div>
      <div className="post-content">{post.content}</div>
    </div>
  );
};

export default ForumPost;