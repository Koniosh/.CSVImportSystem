import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductData() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>🛒 Product Data</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Flavour</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id}</td>
              <td>{prod.name}</td>
              <td>{prod.flavour}</td>
              <td>{prod.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/home")} className="home-button">
        🏠 Back to Home
      </button>
    </div>
  );
}

export default ProductData;
