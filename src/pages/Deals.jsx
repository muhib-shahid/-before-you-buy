import { useState, useEffect } from 'react';
import { getDeals } from '../services/dealService';
import DealList from '../components/deals/DealList';
// import './Deals.css';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      // Fetch all deals (remove activeOnly filter to see everything)
      const { data, error } = await getDeals();
      setLoading(false);
      if (error) setError(error);
      else setDeals(data || []);
    };
    fetchDeals();
  }, []);

  if (loading) return <div className="loading-spinner">Loading deals...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="deals-page">
      <h1><i className="fas fa-tags"></i> Game Deals</h1>
      <DealList deals={deals} />
    </div>
  );
};

export default Deals;