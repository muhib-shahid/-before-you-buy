// import './GameTags.css';

const GameTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="game-tags">
      {tags.map(tag => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  );
};

export default GameTags;