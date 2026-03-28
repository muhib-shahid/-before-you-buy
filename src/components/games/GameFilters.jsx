import { useState } from 'react';
// import './GameFilters.css';

const GameFilters = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, genre });
  };

  const handleGenre = (e) => {
    const value = e.target.value;
    setGenre(value);
    onFilterChange({ search, genre: value });
  };

  return (
    <div className="game-filters">
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={handleSearch}
        className="filter-input"
      />
      <select value={genre} onChange={handleGenre} className="filter-select">
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Strategy</option>
        <option value="Adventure">Adventure</option>
        <option value="Simulation">Simulation</option>
        <option value="Sports">Sports</option>
      </select>
    </div>
  );
};

export default GameFilters;