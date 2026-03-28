import DealCard from './DealCard';
// import './DealList.css';

const DealList = ({ deals }) => {
  if (deals.length === 0) return <p>No deals available.</p>;
  return (
    <div className="deal-list">
      {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
    </div>
  );
};

export default DealList;