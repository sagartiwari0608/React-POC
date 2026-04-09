import "./Seachbar.css";

const Searchbar = ({ search, setSearch }) => {
  return (
    <input
      placeholder="Search projects, managers, status..."
      className="search-input"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Searchbar;
