import "./Navbar.css";

const Navbar = ({ source, setSource }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">Project Dashboard</h2>

      <div className="nav-buttons">
        <button
          className={source === "mock" ? "active" : ""}
          onClick={() => setSource("mock")}
        >
          Mock Data
        </button>

        <button
          className={source === "api" ? "active" : ""}
          onClick={() => setSource("api")}
        >
          API Data
        </button>
      </div>
    </nav>
  );
};

export default Navbar;