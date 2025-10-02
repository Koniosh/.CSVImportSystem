import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import csvRoutes from "./routes/csvRoutes.js";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://csv-import-system.netlify.app", // Your Netlify URL (we'll get this after deployment)
    // Add your actual Netlify URL here after deployment
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());

// Connect to MongoDB only if not already connected
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// Add this route before your other routes
app.get("/", (req, res) => {
  res.json({
    message: "CSV Import System API",
    status: "Running",
    endpoints: {
      test: "/api/test",
      upload: "/api/csv/upload",
      data: "/api/csv/data",
    },
  });
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
