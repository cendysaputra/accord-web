import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import "./products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Gagal memuat produk. Pastikan server berjalan."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-head">
        <div className="page-head-inner">
          <div className="container">
            <h1 className="page-title">
              Products<span className="dot">.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          {error ? (
            <p className="state">{error}</p>
          ) : (
            <div className="catalog-grid">
              {loading
                ? Array.from({ length: 9 }).map((_, i) => (
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