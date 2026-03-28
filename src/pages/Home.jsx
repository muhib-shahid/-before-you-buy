// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../services/gameService';
import GameCard from '../components/games/GameCard';
// import './Home.css';

const Home = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const loadFeatured = async () => {
      try {
        // Race against a 5‑second timeout
        const result = await Promise.race([
          getGames({ limit: 6 }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);
        if (!isMounted) return;
        if (result.error) throw new Error(result.error);
        setFeaturedGames(result.data || []);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    // Safety timeout to force loading false after 5 seconds
    timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Game fetch timeout – forcing loading false');
        setLoading(false);
        setError('Request timed out');
      }
    }, 5000);

    loadFeatured();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (loading) return <div className="loading-spinner">Loading games...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <h1>Before You Buy</h1>
        <p>Make informed game purchases with real‑time community feedback and comprehensive data.</p>
        <Link to="/games" className="btn-primary">Explore Games</Link>
      </section>

      <section className="featured">
        <h2>Featured Games</h2>
        <div className="games-grid">
          {featuredGames.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;