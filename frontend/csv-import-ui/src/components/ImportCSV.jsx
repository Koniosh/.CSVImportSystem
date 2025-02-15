import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";

function ImportCSV() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Reset message
  };

  // Parse CSV and preview data
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
      skipEmptyLines: true, // Ignore empty rows
    });
  };

  // Upload parsed data to backend
  const handleUpload = async () => {
    if (data.length === 0) {
      setMessage("⚠️ No data to upload!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/uploads", { data });
      setMessage("✅ Data uploaded successfully!");
    } catch (error) {
      setMessage("❌ Upload failed! Please try again.");
      console.error("Upload Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📤 Import CSV Data</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleParse} disabled={!file || loading}>
        {loading ? "Processing..." : "Preview"}
      </button>
      <button onClick={handleUpload} disabled={data.length === 0 || loading}>
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
    </div>
  );
}

export default ImportCSV;
