// import './GameComparison.css';

const GameComparison = ({ games }) => {
  if (!games || games.length === 0) return <p>Select games to compare.</p>;
  return (
    <div className="game-comparison">
      <h2>Compare Games</h2>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              {games.map(game => <th key={game.id}>{game.title}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Developer</td>
              {games.map(game => <td key={game.id}>{game.developer || 'N/A'}</td>)}
            </tr>
            <tr>
              <td>Publisher</td>
              {games.map(game => <td key={game.id}>{game.publisher || 'N/A'}</td>)}
            </tr>
            <tr>
              <td>Release Date</td>
              {games.map(game => <td key={game.id}>{game.release_date || 'TBA'}</td>)}
            </tr>
            <tr>
              <td>Genres</td>
              {games.map(game => <td key={game.id}>{game.genres?.join(', ') || 'N/A'}</td>)}
            </tr>
            <tr>
              <td>Minimum RAM</td>
              {games.map(game => <td key={game.id}>{game.min_requirements?.ram || 'N/A'}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameComparison;