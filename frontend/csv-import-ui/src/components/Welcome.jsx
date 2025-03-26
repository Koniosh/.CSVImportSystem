import { useNavigate } from "react-router-dom";
import "./style.css"; // Import CSS for styling
import React from "react";


function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
        <h1 className="text-wrapper" data-Text="CSV Import System">CSV Import System</h1>
        
        <button onClick={() => navigate("/home")} className="btn"> Get Started ➔</button>
    </div>
  );
}

export default Welcome;
