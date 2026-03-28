// import './MediaSection.css';

const MediaSection = ({ game }) => {
  return (
    <section className="media-section">
      <h2>Media</h2>
      <div className="cover-image">
        <img src={game.cover_image_url || '/images/no-image.jpg'} alt={game.title} />
      </div>
      {game.external_links && (
        <div className="external-links">
          <h3>External Links</h3>
          <ul>
            {game.external_links.official && (
              <li><a href={game.external_links.official} target="_blank" rel="noopener noreferrer">Official Site</a></li>
            )}
            {game.external_links.steam && (
              <li><a href={game.external_links.steam} target="_blank" rel="noopener noreferrer">Steam</a></li>
            )}
            {game.external_links.gog && (
              <li><a href={game.external_links.gog} target="_blank" rel="noopener noreferrer">GOG</a></li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default MediaSection;