// import './StreamEmbed.css';

const StreamEmbed = ({ streamUrl, platform = 'twitch' }) => {
  return (
    <div className="stream-embed">
      {platform === 'twitch' ? (
        <iframe
          src={`https://player.twitch.tv/?channel=${streamUrl}&parent=${window.location.hostname}`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          title="Twitch Stream"
        ></iframe>
      ) : (
        <p>Stream platform not supported.</p>
      )}
    </div>
  );
};

export default StreamEmbed;