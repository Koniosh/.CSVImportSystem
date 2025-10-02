import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./productStyle.css";
import { API_URL } from "../config"; // Add this import

function ProductData() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/products`).then((res) => {
      // Updated
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/products/${id}`); // Updated
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-container">
      <h2>🛒 Product Data</h2>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Flavour</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id}</td>
              <td>{prod.name}</td>
              <td>{prod.flavour}</td>
              <td>{prod.size}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(prod._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/home")} className="home-button2">
        🏠 Back to Home
      </button>
    </div>
  );
}

export default ProductData;
