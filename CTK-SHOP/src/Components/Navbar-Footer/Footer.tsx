import React from "react";
import "./Navbar.scss"; // koristi isti stil kao i navbar

const Footer: React.FC = () => {
  return (
    <footer className="navbar-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} CTK Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;