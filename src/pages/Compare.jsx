import { useState, useEffect } from 'react';
import { getGames } from '../services/gameService';
import GameComparison from '../components/games/GameComparison';
// import './Compare.css';

const Compare = () => {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      const { data, error } = await getGames();
      setLoading(false);
      if (error) setError(error);
      else setGames(data || []);
    };
    loadGames();
  }, []);

  const handleSelectGame = (gameId) => {
    const game = games.find(g => g.id === parseInt(gameId));
    if (game && !selectedGames.find(g => g.id === game.id)) {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleRemoveGame = (gameId) => {
    setSelectedGames(selectedGames.filter(g => g.id !== gameId));
  };

  if (loading) return <div className="loading-spinner">Loading games...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="compare-page">
      <h1>Compare Games</h1>
      <div className="select-games">
        <select onChange={(e) => handleSelectGame(e.target.value)} value="">
          <option value="">Select a game to compare</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.title}</option>
          ))}
        </select>
        <div className="selected-games">
          {selectedGames.map(game => (
            <div key={game.id} className="selected-game-tag">
              {game.title}
              <button onClick={() => handleRemoveGame(game.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
      {selectedGames.length > 0 && <GameComparison games={selectedGames} />}
    </div>
  );
};

export default Compare;