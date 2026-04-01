import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="app-navbar" aria-label="Main">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "app-nav-link app-nav-link--active" : "app-nav-link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/comparison"
        className={({ isActive }) => (isActive ? "app-nav-link app-nav-link--active" : "app-nav-link")}
      >
        Comparison mode
      </NavLink>
      <NavLink
        to="/qas"
        className={({ isActive }) => (isActive ? "app-nav-link app-nav-link--active" : "app-nav-link")}
      >
        Q/As
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "app-nav-link app-nav-link--active" : "app-nav-link")}
      >
        History log
      </NavLink>
    </nav>
  );
}
