// import './GameFilters.css';

// CHANGE the component to accept props instead of internal state
const GameFilters = ({ search, genre, onFilterChange }) => { // CHANGE THIS LINE
  // REMOVE the useState lines – DELETE BOTH
  // const [search, setSearch] = useState('');  <-- DELETE
  // const [genre, setGenre] = useState('');    <-- DELETE

  // SIMPLIFY handlers – they now call onFilterChange directly
  const handleSearch = (e) => {
    onFilterChange({ search: e.target.value, genre });
  };

  const handleGenre = (e) => {
    onFilterChange({ search, genre: e.target.value });
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