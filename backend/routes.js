import express from "express";
import { uploadCSV, getEmployees, getProducts } from "./controllers.js";
import { upload } from "./middleware.js";

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

export default router;
