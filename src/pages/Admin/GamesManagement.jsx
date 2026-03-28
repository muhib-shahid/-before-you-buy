import { useState, useEffect } from 'react';
import { getGames, deleteGame } from '../../services/gameService';
import GameApprovalQueue from '../../components/admin/GameApprovalQueue';
// import './GamesManagement.css';

const AdminGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await getGames();
      setLoading(false);
      if (error) setError(error);
      else setGames(data || []);
    };
    fetchGames();
  }, []);

  const handleApprove = (gameId) => {
    // In a real scenario, you might update a status flag
    alert(`Approve game ${gameId} – functionality to be implemented`);
  };

  const handleReject = async (gameId) => {
    if (window.confirm('Delete this game?')) {
      const { error } = await deleteGame(gameId);
      if (error) alert(error);
      else setGames(games.filter(g => g.id !== gameId));
    }
  };

  if (loading) return <div className="loading-spinner">Loading games...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-games">
      <h1><i className="fas fa-gamepad"></i> Game Management</h1>
      <h2>Pending Approval</h2>
      {/* For simplicity, we show all games; you could filter by a status field */}
      <GameApprovalQueue
        games={games}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminGames;