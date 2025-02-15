import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductData() {
  const [products, setProducts] = useState([]);

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
            <th>Name</th>
            <th>Flavour</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.flavour}</td>
              <td>{prod.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductData;
