import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => (
  <footer className="footer modern-footer">
    <div className="container modern-footer-content">
      <div className="footer-brand">
        <span className="icon is-medium has-text-primary">
          <i className="fas fa-store"></i>
        </span>
        <span className="ml-2 has-text-weight-bold is-size-5">CTK Shop</span>
      </div>
      <div className="footer-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <span className="icon"><i className="fab fa-github"></i></span>
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <span className="icon"><i className="fab fa-twitter"></i></span>
        </a>
        <a href="mailto:support@ctkshop.com" aria-label="Email">
          <span className="icon"><i className="fas fa-envelope"></i></span>
        </a>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} CTK Shop. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;