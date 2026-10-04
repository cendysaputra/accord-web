import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("/api/products")
      .then((res) => setProducts(res.data.slice(0, 6)))
      .catch(() => setError("Gagal memuat produk. Pastikan server berjalan."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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
          </div>

          <div className="hero-bars" aria-hidden="true">
            {Array.from({ length: 240 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        <div className="hero-media">
          <img
            src="/images/hero-banner.png"
            alt="headphone-hero"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="featured-head">
            <h2 className="featured-title">Our Products</h2>
          </div>

          {error ? (
            <p className="state">{error}</p>
          ) : (
            <div className="featured-grid">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div className="card-skeleton" key={i}>
                      <div className="skeleton-thumb" />
                      <div className="skeleton-line skeleton-line-name" />
                      <div className="skeleton-line skeleton-line-desc" />
                      <div className="skeleton-line skeleton-line-price" />
                    </div>
                  ))
                : products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}