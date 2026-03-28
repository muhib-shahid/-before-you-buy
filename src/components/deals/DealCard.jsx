// import './DealCard.css';

const DealCard = ({ deal }) => {
  return (
    <div className="deal-card">
      <h4>{deal.title}</h4>
      <p className="deal-price">${deal.price}</p>
      <p className="deal-store">{deal.store}</p>
      {deal.expires_at && (
        <p className="deal-expiry">Expires: {new Date(deal.expires_at).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default DealCard;