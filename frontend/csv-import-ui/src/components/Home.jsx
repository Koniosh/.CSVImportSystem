import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./homeStyle.css";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const navigate = useNavigate();

  const handleMouseEnter = (text) => {
    setHoverText(text);
  };

  const handleMouseLeave = () => {
    setHoverText("");
  };

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
        {darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </button>
      <div className={`container ${lightMode ? "light-mode" : ""}`}>
        <button onClick={toggleLightMode} className="mode-toggle">
          {lightMode ? "🌞 Light Mode" : " 🌙 Dark Mode"}
        </button>
        <div className="card">
          <h1>Welcome to the CSV Import System</h1>
        </div>
        <nav>
          <div
            onMouseEnter={() =>
              handleMouseEnter(
                "On clicking this, you can import a CSV file from your local system." +
                "NOTE:Only .CSV File allowed"
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/import">📤 Import Data</Link>
          </div>

          <div
            onMouseEnter={() =>
              handleMouseEnter("View the employee data stored in the local system.")
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/employees">👨‍💼 View Employee Data</Link>
          </div>

          <div
            onMouseEnter={() =>
              handleMouseEnter("Explore the list of available products.")
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/products">🛒 View Product Data</Link>
          </div>

          <div
            onMouseEnter={() =>
              handleMouseEnter(
                "Filter products by size: Small, Medium, or Large."
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/filter-products">🔍 Filter Products by Size</Link>
          </div>
        </nav>

        {hoverText && <div className="hover-description">{hoverText}</div>}

        <button onClick={() => navigate("/")} className="home-button">
          🏠 Back to Welcome Page ←
        </button>
      </div>
    </div>
  );
}

export default Home;




 
    
   

