import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-grid container">
          <div className="hero-text">
            <h1 className="hero-title">
              Sound worth sitting with<span className="dot">.</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-lead">
                Headphones and headsets picked for comfort and honest sound.
              </p>

              <Link to="/products" className="btn-line">
                View Product
                <svg
                  width="26"
                  height="14"
                  viewBox="0 0 26 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="0" y1="7" x2="24" y2="7" />
                  <polyline points="18 1 24 7 18 13" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <img src="/images/hero.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}