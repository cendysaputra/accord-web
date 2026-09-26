import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import formatPrice from "../formatPrice";
import "./productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axiosClient
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Produk tidak ditemukan."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="container">
        <p className="state">Memuat produk...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        <p className="state">{error}</p>
        <Link to="/products" className="btn-line">
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="detail">
        <div className="detail-inner">
          <div className="detail-grid container">
            <div className="detail-media">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="detail-info">
              <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                <span>/</span>
                <span className="breadcrumb-current">{product.name}</span>
              </nav>

              <h1 className="detail-title">{product.name}</h1>

              <div className="detail-price-block">
                <p className="detail-price">{formatPrice(product.price)}</p>
                <p className="detail-stock">
                  {product.stock > 0
                    ? `In stock, ${product.stock} units available`
                    : "Out of stock"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="description">
        <div className="container">
          <h2 className="description-title">Description</h2>
          <p className="description-text">{product.description}</p>
        </div>
      </section>
    </>
  );
}