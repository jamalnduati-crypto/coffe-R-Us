// SearchBar
// A controlled input: its value comes from the parent's state, and typing
// calls onSearchChange so the parent can update that state.
// Props: searchTerm (string), onSearchChange (function).
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search coffee..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
      className="mb-8 w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    />
  );
}

export default SearchBar;
