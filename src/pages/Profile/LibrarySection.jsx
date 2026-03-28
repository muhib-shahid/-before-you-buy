import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserWishlist } from '../../services/wishlistService'; // will be provided
import GameCard from '../../components/games/GameCard';
// import './LibrarySection.css';

const LibrarySection = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchWishlist = async () => {
      const { data, error } = await getUserWishlist(user.id);
      setLoading(false);
      if (error) setError(error);
      else setWishlist(data || []);
    };
    fetchWishlist();
  }, [user]);

  if (loading) return <div className="loading-spinner">Loading wishlist...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="library-section">
      <h2><i className="fas fa-heart"></i> My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="games-grid">
          {wishlist.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
};

export default LibrarySection;