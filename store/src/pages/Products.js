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
          <div className="page-head-grid container">
            <h1 className="page-title">
              Products<span className="dot">.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          {loading && <p className="state">Memuat produk...</p>}
          {error && <p className="state">{error}</p>}

          {!loading && !error && (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}