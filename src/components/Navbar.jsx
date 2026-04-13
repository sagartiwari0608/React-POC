import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
