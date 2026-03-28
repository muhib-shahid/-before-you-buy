// import './GameApprovalQueue.css';

const GameApprovalQueue = ({ games, onApprove, onReject }) => {
  if (!games || games.length === 0) {
    return <p>No games pending approval.</p>;
  }
  return (
    <ul className="approval-queue">
      {games.map(game => (
        <li key={game.id}>
          <span>{game.title}</span>
          <button onClick={() => onApprove(game.id)} className="approve">Approve</button>
          <button onClick={() => onReject(game.id)} className="reject">Reject</button>
        </li>
      ))}
    </ul>
  );
};

export default GameApprovalQueue;