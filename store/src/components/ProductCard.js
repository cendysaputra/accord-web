import React from "react";
import { useNavigate } from "react-router-dom";
import formatPrice from "../formatPrice";
import "./productCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

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
      <div className="product-thumb">
        <img src={product.image} alt={product.name} />
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