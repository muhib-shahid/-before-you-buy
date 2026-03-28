// import './SystemRequirements.css';

const SystemRequirements = ({ requirements, type = 'minimum' }) => {
  if (!requirements) return <p>No {type} requirements available.</p>;
  return (
    <div className="system-requirements">
      <h4>{type === 'minimum' ? 'Minimum' : 'Recommended'}</h4>
      <ul>
        <li>OS: {requirements.os || 'N/A'}</li>
        <li>CPU: {requirements.cpu || 'N/A'}</li>
        <li>RAM: {requirements.ram || 'N/A'}</li>
        <li>GPU: {requirements.gpu || 'N/A'}</li>
        <li>Storage: {requirements.storage || 'N/A'}</li>
      </ul>
    </div>
  );
};

export default SystemRequirements;