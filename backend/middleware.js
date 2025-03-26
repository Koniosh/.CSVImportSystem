import multer from "multer";
import path from "path";

// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

// Multer Storage Configuration (Saves File With Original Name)
const storage = multer.memoryStorage();

// Multer File Upload Middleware (Restrict to CSV files & Limit Size)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
});

// CSV Upload Error Handling
const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: "File upload error: " + err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

export { logger, errorHandler, upload, uploadErrorHandler };
