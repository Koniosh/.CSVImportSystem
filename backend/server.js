import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";
import uploadRoutes from "./routes.js";


dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({
  origin: 'http://localhost:5173' 
})); 
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Routes
app.use("/api", uploadRoutes);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
