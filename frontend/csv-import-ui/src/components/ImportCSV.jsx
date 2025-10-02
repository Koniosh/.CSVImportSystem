import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./importStyle.css";
import { API_URL } from "../config"; // Add this import

function ImportCSV() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleParse = () => {
    if (!file) {
      setMessage("⚠️ Please select a CSV file first!");
      return;
    }

    setLoading(true);
    Papa.parse(file, {
      complete: (result) => {
        setData(result.data);
        setLoading(false);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        // Updated
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(` ${response.data.message}`);
      setData([]);
    } catch (error) {
      setMessage(" Upload failed! Please try again.");
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-container">
      <h2>📤 Import CSV Data</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleParse} disabled={!file || loading}>
        {loading ? "Processing..." : "Preview"}
      </button>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}

      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <br />
      <button onClick={() => navigate("/home")} className="home-buttons">
        🏠 Back to Home
      </button>
      <button onClick={() => navigate("/employees")} className="home-buttons">
        🏠 Back to Employee Data
      </button>
      <button onClick={() => navigate("/products")} className="home-buttons">
        🏠 Back to Product Data
      </button>
    </div>
  );
}

export default ImportCSV;
