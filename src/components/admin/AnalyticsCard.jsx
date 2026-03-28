// import './AnalyticsCard.css';

const AnalyticsCard = ({ title, value, change }) => {
  return (
    <div className="analytics-card">
      <h4>{title}</h4>
      <p className="value">{value}</p>
      {change && (
        <p className={`change ${change > 0 ? 'positive' : 'negative'}`}>
          {change > 0 ? '+' : ''}{change}%
        </p>
      )}
    </div>
  );
};

export default AnalyticsCard;