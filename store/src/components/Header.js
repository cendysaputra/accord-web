import React from "react";
import "./header.css";

export default function Header() {
   return (
      <header className="header container">
         <div className="logo">Accord<span className="dot">.</span></div>
         <nav className="nav">
            <a href="/">Home</a>
            <a href="/products">Products</a>
         </nav>
      </header>
   );
}