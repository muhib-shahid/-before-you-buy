import GameCard from './GameCard';
// import './GameList.css';

const GameList = ({ games }) => {
  if (games.length === 0) {
    return <p className="no-games">No games found.</p>;
  }
  return (
    <div className="game-list">
      {games.map(game => <GameCard key={game.id} game={game} />)}
    </div>
  );
};

export default GameList;