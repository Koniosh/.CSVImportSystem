import express from "express";
import { uploadCSV, getEmployees, getProducts } from "./controllers.js";
import { upload } from "./middleware.js";
import Product from "./models/Product.js";
import Employee from "./models/Employee.js"; // Import Employee Model

const router = express.Router();

// Upload CSV file
router.post("/upload", upload.single("csvFile"), uploadCSV);

// Get all employees
router.get("/employees", getEmployees);

// Get all products (supports filtering by size)
router.get("/products", getProducts);

// Get a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

// ✅ DELETE an Employee (New API)
router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error while deleting employee" });
  }
});

// DELETE product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;