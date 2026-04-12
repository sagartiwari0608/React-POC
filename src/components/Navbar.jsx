import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ source, setSource }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2 className="logo">Project Dashboard</h2>

        <div className="nav-links">
          <NavLink
            to="/projects"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
          >
            Tasks
          </NavLink>
        </div>
      </div>

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
