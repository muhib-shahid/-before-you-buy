// import './PriceHistoryChart.css';

const PriceHistoryChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No price history available.</p>;
  return (
    <div className="price-history-chart">
      <h4>Price History</h4>
      <ul>
        {data.map((point, idx) => (
          <li key={idx}>
            {new Date(point.date).toLocaleDateString()}: ${point.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceHistoryChart;