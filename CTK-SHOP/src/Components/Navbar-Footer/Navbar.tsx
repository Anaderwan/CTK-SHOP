
import React from "react";
import { Link } from "react-router";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar is-primary full-width-navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu is-active full-width-navbar-content">
        <div className="navbar-start">
          <Link to="/stores" className="navbar-item">
            Stores
          </Link>
          <Link to="/items" className="navbar-item">
            Items
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/create-store" className="navbar-item">
            Create Store
          </Link>
          <Link to="/create-item" className="navbar-item">
            Create Item
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
