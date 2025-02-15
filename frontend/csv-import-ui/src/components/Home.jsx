import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>CSV Import System</h1>
      <nav>
        <Link to="/import">📤 Import Data</Link>
        <Link to="/employees">👨‍💼 View Employee Data</Link>
        <Link to="/products">🛒 View Product Data</Link>
        <Link to="/filter-products">🔍 Filter Products by Size</Link>
      </nav>
    </div>
  );
}

export default Home;
