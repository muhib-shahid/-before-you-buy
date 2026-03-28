// import './CompatibilityBadge.css';

const CompatibilityBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'compatible': return 'badge-success';
      case 'incompatible': return 'badge-error';
      case 'unknown': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  return (
    <span className={`compatibility-badge ${getBadgeClass()}`}>
      {status}
    </span>
  );
};

export default CompatibilityBadge;