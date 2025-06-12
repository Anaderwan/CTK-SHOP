/**
 * Footer component
 * 
 * - Displays a simple application footer with a copyright message.
 * - Positioned at the bottom of the page.
 */
import React from "react";

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