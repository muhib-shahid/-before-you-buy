import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // ADD THIS LINE
import { getGames } from '../services/gameService';
import GameCard from '../components/games/GameCard';
import GameFilters from '../components/games/GameFilters';
// import './Games.css';

const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // ADD THIS LINE
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // REMOVE the [filters, setFilters] line – DELETE IT
  // const [filters, setFilters] = useState({});  <-- DELETE THIS LINE

  // REPLACE the useEffect dependency
  useEffect(() => {
    loadGames();
  }, [searchParams]); // CHANGE from [filters] to [searchParams]

  const loadGames = async () => {
    setLoading(true);
    // BUILD filters from URL params instead of state
    const filters = {};
    const search = searchParams.get('search');
    const genre = searchParams.get('genre');
    if (search) filters.search = search;
    if (genre) filters.genre = genre;
    const { data, error } = await getGames(filters);
    setLoading(false);
    if (error) setError(error);
    else setGames(data || []);
  };

  // ADD THIS HANDLER FUNCTION
  const handleFilterChange = (newFilters) => {
    const newParams = new URLSearchParams();
    if (newFilters.search) newParams.set('search', newFilters.search);
    if (newFilters.genre) newParams.set('genre', newFilters.genre);
    setSearchParams(newParams);
  };

  return (
    <div className="games-page">
      <h1>All Games</h1>
      {/* CHANGE THE GameFilters line – pass search and genre from URL */}
      <GameFilters 
        search={searchParams.get('search') || ''} 
        genre={searchParams.get('genre') || ''} 
        onFilterChange={handleFilterChange} 
      />
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