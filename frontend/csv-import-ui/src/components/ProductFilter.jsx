import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("Small");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products?size=${size}`).then((res) => {
      setProducts(res.data);
    });
  }, [size]);

  return (
    <div className="container">
      <h2>🔍 Filter Products by Size</h2>
      <select onChange={(e) => setSize(e.target.value)}>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - {prod.flavour} ({prod.size})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductFilter;
