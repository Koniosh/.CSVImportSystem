import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function EmployeeData() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  


  return (
    <div className="container">
      <h2>👨‍💼 Employee Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.number}</td>
              <td>{emp.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/home")} className="home-button">
        🏠 Back to Home
      </button>
    </div>
  );
}

export default EmployeeData;
