import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDeals } from '../services/dealService';
import DealList from '../components/deals/DealList';

const Deals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Local input state – never overridden by URL after initial load
  const [inputValue, setInputValue] = useState(() => searchParams.get('search') || '');
  const isFirstRender = useRef(true);

  const urlSearch = searchParams.get('search') || '';

  // Fetch when URL search changes (only on initial load and after blur/Enter)
  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const filters = {};
      if (urlSearch.trim()) filters.search = urlSearch;
      const { data, error } = await getDeals(filters);
      setLoading(false);
      if (error) setError(error);
      else setDeals(data || []);
    };
    fetchDeals();
  }, [urlSearch]);

  // Sync local input with URL only when URL changes externally (e.g., back button)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setInputValue(urlSearch);
  }, [urlSearch]);

  const commitSearch = () => {
    const newSearch = inputValue.trim();
    const newParams = new URLSearchParams();
    if (newSearch) newParams.set('search', newSearch);
    setSearchParams(newParams);
  };

  const handleBlur = () => {
    commitSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitSearch();
    }
  };

  if (loading) return <div className="loading-spinner">Loading deals...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="deals-page">
      <h1><i className="fas fa-tags"></i> Game Deals</h1>
      <div className="game-filters">
        <input
          type="text"
          placeholder="Search deals by game name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="filter-input"
        />
      </div>
      <DealList deals={deals} />
    </div>
  );
};

export default Deals;