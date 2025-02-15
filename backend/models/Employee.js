import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
  address: String,
});

// Prevent overwriting model
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
