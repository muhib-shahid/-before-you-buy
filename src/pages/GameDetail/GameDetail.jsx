import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameBySlug } from '../../services/gameService';
import { usePresence } from '../../hooks/usePresence';
import InfoSection from './InfoSection';
import MediaSection from './MediaSection';
import CommunitySection from './CommunitySection';
// import './GameDetail.css';

const GameDetail = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const viewers = usePresence(game?.id);

  useEffect(() => {
    loadGame();
  }, [slug]);

  const loadGame = async () => {
    setLoading(true);
    const { data, error } = await getGameBySlug(slug);
    setLoading(false);
    if (error) setError(error);
    else setGame(data);
  };

  if (loading) return <div className="loading-spinner">Loading game...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!game) return <div className="error-message">Game not found</div>;

  return (
    <div className="game-detail">
      <div className="game-header">
        <h1>{game.title}</h1>
        {viewers.length > 0 && (
          <p className="viewers-count">{viewers.length} viewing now</p>
        )}
      </div>
      <InfoSection game={game} />
      <MediaSection game={game} />
      <CommunitySection gameId={game.id} />
    </div>
  );
};

export default GameDetail;