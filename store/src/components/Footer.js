import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <Link to="/" className="footer-logo">
          Accord<span className="dot">.</span>
        </Link>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Product</Link>
        </nav>
      </div>

      <div className="footer-bottom container">
        <small>© {new Date().getFullYear()}. Cendy Saputra</small>
        <small>Binus University Online</small>
      </div>
    </footer>
  );
}