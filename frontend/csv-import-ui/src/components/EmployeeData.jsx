import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeData() {
  const [employees, setEmployees] = useState([]);

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
            <th>ID</th>
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
    </div>
  );
}

export default EmployeeData;
