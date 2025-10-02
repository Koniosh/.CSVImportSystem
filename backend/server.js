import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import csvRoutes from "./routes/csvRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "CSV Import System API is running!" });
});

app.use("/api/csv", csvRoutes);

// Don't listen when imported (for Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
