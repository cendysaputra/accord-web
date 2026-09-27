import React from "react";
import "./notFound.css";

export default function NotFound() {
  return (
    <section className="error-404">
      <div className="container">
        <div className="error-inner">
          <div className="error-stack">
            <p className="error-number" aria-hidden="true">
              404
            </p>
            <h2 className="error-heading">Page not found</h2>
          </div>
        </div>
      </div>
    </section>
  );
}