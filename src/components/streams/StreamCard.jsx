// import './StreamCard.css';

const StreamCard = ({ stream }) => {
  return (
    <div className="stream-card">
      <img src={stream.thumbnail_url} alt={stream.title} className="stream-thumbnail" />
      <div className="stream-info">
        <h4>{stream.title}</h4>
        <p>by {stream.streamer_name}</p>
        <span className="viewer-count">{stream.viewer_count} viewers</span>
      </div>
    </div>
  );
};

export default StreamCard;