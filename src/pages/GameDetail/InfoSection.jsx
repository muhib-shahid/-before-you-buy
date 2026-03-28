// import './InfoSection.css';

const InfoSection = ({ game }) => {
  const min = game.min_requirements || {};
  const rec = game.rec_requirements || {};

  return (
    <section className="info-section">
      <div className="game-meta">
        <p><strong>Developer:</strong> {game.developer || 'N/A'}</p>
        <p><strong>Publisher:</strong> {game.publisher || 'N/A'}</p>
        <p><strong>Release Date:</strong> {game.release_date || 'TBA'}</p>
        <p><strong>Genres:</strong> {game.genres?.join(', ') || 'N/A'}</p>
        <p><strong>Platforms:</strong> {game.platforms?.join(', ') || 'N/A'}</p>
      </div>
      <div className="system-requirements">
        <h3>Minimum Requirements</h3>
        <ul>
          <li>OS: {min.os || 'N/A'}</li>
          <li>CPU: {min.cpu || 'N/A'}</li>
          <li>RAM: {min.ram || 'N/A'}</li>
          <li>GPU: {min.gpu || 'N/A'}</li>
          <li>Storage: {min.storage || 'N/A'}</li>
        </ul>
        <h3>Recommended Requirements</h3>
        <ul>
          <li>OS: {rec.os || 'N/A'}</li>
          <li>CPU: {rec.cpu || 'N/A'}</li>
          <li>RAM: {rec.ram || 'N/A'}</li>
          <li>GPU: {rec.gpu || 'N/A'}</li>
          <li>Storage: {rec.storage || 'N/A'}</li>
        </ul>
      </div>
    </section>
  );
};

export default InfoSection;