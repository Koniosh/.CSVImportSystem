import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("Small");
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate


  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products?size=${size}`)
      .then((res) => {
        // Handle the response data
        const fetchedProducts = res.data;
        if (fetchedProducts.length > 0) {
          setAllProducts(fetchedProducts);
          filterProductsBySize(size, fetchedProducts);
        } else {
          console.log("No products found for size:", size);
        }
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, [size]); // Dependency on size

  const filterProductsBySize = (size, data) => {
    const filtered = data.filter((product) => product.size === size);
    setProducts(filtered);
  };

  
 
  const handleSizeChange = (e) => {
    setSize(e.target.value); // Update selected size
  };


  return (
    <div className="container">
      <h2>🔍 Filter Products by Size</h2>
      <select onChange={handleSizeChange} value={size}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - {prod.flavour} ({prod.size})
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/home")} className="home-button">
        🏠 Back to Home
      </button>
    </div>
  );
}

export default ProductFilter;
