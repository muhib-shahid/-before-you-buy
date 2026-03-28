import { useState, useEffect } from 'react';
import { getGames } from '../services/gameService';
import GameCard from '../components/games/GameCard';
import GameFilters from '../components/games/GameFilters';
// import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadGames();
  }, [filters]);

  const loadGames = async () => {
    setLoading(true);
    const { data, error } = await getGames(filters);
    setLoading(false);
    if (error) setError(error);
    else setGames(data || []);
  };

  return (
    <div className="games-page">
      <h1>All Games</h1>
      <GameFilters onFilterChange={setFilters} />
      {loading && <div className="loading-spinner">Loading games...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <div className="games-grid">
          {games.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
};

export default Games;