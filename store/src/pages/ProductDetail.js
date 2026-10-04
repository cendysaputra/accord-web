import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ProductCard from "../components/ProductCard";
import formatPrice from "../formatPrice";
import "./productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    setRevealed(false);

    axiosClient
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Produk tidak ditemukan."))
      .finally(() => setLoading(false));

    axiosClient
      .get("/api/products")
      .then((res) => setOthers(res.data.filter((p) => p._id !== id).slice(0, 3)))
      .catch(() => setOthers([]));
  }, [id]);

  useEffect(() => {
    if (loading || error) return;

    const node = mediaRef.current;
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
  }, [loading, error, id]);

  if (error) {
    return (
      <section className="detail-state container">
        <p className="state">{error}</p>
        <Link to="/products" className="btn-line">
          Back to products
        </Link>
      </section>
    );
  }

  const inStock = !loading && product.stock > 0;

  return (
    <>
      <section className="detail">
        <div className="detail-inner">
          <div className="detail-grid container">
            <div
              className={revealed ? "detail-media is-revealed" : "detail-media"}
              ref={mediaRef}
            >
              {loading ? (
                <div className="detail-media-skeleton" />
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    fetchpriority="high"
                    decoding="async"
                  />
                  <span className="media-cover" aria-hidden="true" />
                </>
              )}
            </div>

            <div className="detail-info">
              <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                <span>/</span>
                <span className="breadcrumb-current">
                  {loading ? "..." : product.name}
                </span>
              </nav>

              <h1 className="detail-title">
                {loading ? "Memuat produk..." : product.name}
              </h1>

              <p className="detail-lead">
                {loading ? "" : product.description.split(". ")[0] + "."}
              </p>

              <div className="detail-price-block">
                <p className="detail-price">
                  {loading ? "" : formatPrice(product.price)}
                </p>

                {!loading && (
                  <p
                    className={
                      inStock
                        ? "detail-stock detail-stock-in"
                        : "detail-stock detail-stock-out"
                    }
                  >
                    {inStock
                      ? `In stock, ${product.stock} units available`
                      : "Out of stock"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="detail-desc container">
            <h2 className="detail-desc-title">Description</h2>
            <p className="detail-desc-text">{loading ? "" : product.description}</p>
          </div>
        </div>
      </section>

      <section className="related">
        <div className="container">
          <div className="related-grid">
            {others.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}