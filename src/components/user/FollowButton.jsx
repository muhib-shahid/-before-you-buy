import { useState } from 'react';
// import './FollowButton.css';

const FollowButton = ({ userId, isFollowing: initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsFollowing(!isFollowing);
      setLoading(false);
    }, 500);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`follow-button ${isFollowing ? 'following' : ''}`}
    >
      {loading ? '...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;