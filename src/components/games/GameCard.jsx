import { Link } from 'react-router-dom';
// import './GameCard.css';

const GameCard = ({ game }) => {
  const imageUrl = game.cover_image_url || '/images/no-image.jpg';
  const year = game.release_date ? new Date(game.release_date).getFullYear() : 'TBA';

  return (
    <Link to={`/game/${game.slug}`} className="game-card">
      <div className="game-card-image">
        <img src={imageUrl} alt={game.title} loading="lazy" />
      </div>
      <h3 className="game-card-title">{game.title}</h3>
      <div className="game-card-meta">
        <span>{year}</span>
        <span>{game.genres?.[0] || 'General'}</span>
      </div>
    </Link>
  );
};

export default GameCard;