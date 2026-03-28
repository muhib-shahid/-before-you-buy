// import './HardwareProfileCard.css';

const HardwareProfileCard = ({ profile }) => {
  return (
    <div className="hardware-profile-card">
      <h4>{profile.name || 'My PC'}</h4>
      <ul>
        <li>CPU: {profile.cpu || 'N/A'}</li>
        <li>RAM: {profile.ram || 'N/A'} GB</li>
        <li>GPU: {profile.gpu || 'N/A'}</li>
        <li>OS: {profile.os || 'N/A'}</li>
      </ul>
    </div>
  );
};

export default HardwareProfileCard;