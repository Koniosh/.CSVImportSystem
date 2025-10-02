import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import csvRoutes from "./routes/csvRoutes.js";
import multer from "multer";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://csv-import-system.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "CSV Import System API is running!" });
});

// Add direct upload route that matches frontend
app.post("/api/upload", upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Add your CSV processing logic here
    res.json({ message: "File uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other routes
app.use("/api/csv", csvRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/products", productRoutes);

export default app;
