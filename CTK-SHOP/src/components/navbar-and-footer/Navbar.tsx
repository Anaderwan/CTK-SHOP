import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar modern-navbar" role="navigation" aria-label="main navigation">
      <div className="container is-fluid full-width-navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item brand-logo">
            <span className="icon is-large has-text-primary">
              <i className="fas fa-store fa-lg"></i>
            </span>
            <span className="ml-2 has-text-weight-bold is-size-5">CTK Shop</span>
          </Link>
        </div>
        <div className="navbar-menu modern-navbar-menu is-active">
          <div className="navbar-start">
            <Link
              to="/stores"
              className={`navbar-item${location.pathname === "/stores" ? " is-active" : ""}`}
            >
              <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
              <span>Stores</span>
            </Link>
            <Link
              to="/items"
              className={`navbar-item${location.pathname === "/items" ? " is-active" : ""}`}
            >
              <span className="icon"><i className="fas fa-box-open"></i></span>
              <span>Items</span>
            </Link>
          </div>
          <div className="navbar-end">
            <Link
              to="/create-store"
              className={`navbar-item${location.pathname === "/create-store" ? " is-active" : ""}`}
            >
              <span className="icon"><i className="fas fa-plus-circle"></i></span>
              <span>Create Store</span>
            </Link>
            <Link
              to="/create-item"
              className={`navbar-item${location.pathname === "/create-item" ? " is-active" : ""}`}
            >
              <span className="icon"><i className="fas fa-plus-square"></i></span>
              <span>Create Item</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;