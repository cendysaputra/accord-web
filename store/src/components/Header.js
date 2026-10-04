import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sudahLogin = Boolean(localStorage.getItem("token"));

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="header container">
      <Link to="/" className="logo">
        Accord<span className="dot">.</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
      >
        <span className={open ? "bar bar-1 is-open" : "bar bar-1"} />
        <span className={open ? "bar bar-2 is-open" : "bar bar-2"} />
      </button>

      <nav className={open ? "nav is-open" : "nav"}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {sudahLogin ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}