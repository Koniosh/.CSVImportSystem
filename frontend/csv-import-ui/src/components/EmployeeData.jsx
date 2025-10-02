import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./employeeStyle.css";
import { API_URL } from "../config"; // Add this import

function EmployeeData() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/employees`).then((res) => {
      // Updated
      setEmployees(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/employees/${id}`); // Updated
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <h2>👨‍💼 Employee Data</h2>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>UUID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp._id}</td>
              <td>{emp._id}</td>
              <td>{emp.name}</td>
              <td>{emp.number}</td>
              <td>{emp.address}</td>
              <td>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/home")} className="home-button1">
        🏠 Back to Home
      </button>
      <button onClick={() => navigate("/home")} className="home-button1">
        🏠 Back to Home
      </button>
    </div>
  );
}

export default EmployeeData;
