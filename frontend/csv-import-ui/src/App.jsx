import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import ImportCSV from "./components/ImportCSV.jsx";
import EmployeeData from "./components/EmployeeData.jsx";
import ProductData from "./components/ProductData.jsx";
import ProductFilter from "./components/ProductFilter.jsx";
import Welcome from './components/Welcome.jsx';
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/import" element={<ImportCSV />} />
        <Route path="/employees" element={<EmployeeData />} />
        <Route path="/products" element={<ProductData />} />
        <Route path="/filter-products" element={<ProductFilter />} />
      </Routes>
    </Router>
  );
}

export default App;
