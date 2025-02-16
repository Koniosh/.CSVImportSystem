import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ImportCSV() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Reset message when new file is selected
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
  // const handleUpload = async () => {
  //   if (!file) {
  //     setMessage("⚠️ Please upload the file first!");
  //     return;
  //   }

  //   if (data.length === 0) {
  //     setMessage("⚠️ No data to upload!");
  //     return;
  //   }

  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("csvFile", file); // Append the selected file

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     setMessage("✅ Data uploaded successfully!");
  //     console.log("Upload successful:", response.data);
  //   } catch (error) {
  //     setMessage("❌ Upload failed! Please try again.");
  //     console.error("Upload Error:", error.response?.data || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("csvFile", file);
  
    setLoading(true); // Show loading indicator
  
    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setMessage(`✅ ${response.data.message}`); // Show success message
      setData([]); // Clear preview data after upload
    } catch (error) {
      setMessage("❌ Upload failed! Please try again.");
      console.error("Upload Error:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  
  return (
    <div className="container">
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
     <br/><br/> <button onClick={() => navigate("/home")} className="home-button">
      🏠 Back to Home
     </button>
     <button onClick={() => navigate("/employees")} className="home-button">
      🏠 Back to Employee Data
     </button>
     <button onClick={() => navigate("/products")} className="home-button">
      🏠 Back to Product Data
     </button>
    </div>
  );
}

export default ImportCSV;
