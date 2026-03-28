import StreamCard from './StreamCard';
// import './StreamList.css';

const StreamList = ({ streams }) => {
  if (!streams || streams.length === 0) {
    return <p>No live streams available.</p>;
  }
  return (
    <div className="stream-list">
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
};

export default StreamList;