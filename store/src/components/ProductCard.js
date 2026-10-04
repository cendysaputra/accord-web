import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatPrice from "../formatPrice";
import "./productCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const thumbRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = thumbRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const openDetail = () => navigate(`/products/${product._id}`);

  return (
    <article
      className="product-card"
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter") openDetail();
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={revealed ? "product-thumb is-revealed" : "product-thumb"}
        ref={thumbRef}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <span className="thumb-cover" aria-hidden="true" />
      </div>

      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>

      <div className="product-foot">
        <span className="product-price">{formatPrice(product.price)}</span>
        <svg
          className="product-arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </article>
  );
}