import { useNavigate } from "react-router-dom";
import "../styles.css"; // Import CSS for styling
import React from "react";


function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="overlay"></div>
      <div className="content">
        <h1>🚀CSV Import System</h1>
        
        <button onClick={() => navigate("/home")}>🚀 Get Started</button>
      </div>
    </div>
  );
}

export default Welcome;
