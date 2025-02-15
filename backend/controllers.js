import fs from "fs";
import csvParser from "csv-parser";
import Employee from "./models/Employee.js";
import Product from "./models/Product.js";

// Upload CSV and Save to Database
const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        if (results.length === 0) {
          return res.status(400).json({ message: "CSV file is empty" });
        }

        if ("flavour" in results[0] && "size" in results[0]) {
          // Product CSV Detected
          const formattedProducts = results.map((product) => ({
            id: product.id,
            name: product.name,
            flavour: product.flavour,
            size: product.size,
            price: product.price,
          }));

          await Product.insertMany(formattedProducts);
          return res.json({ message: "Product CSV Data Imported Successfully" });

        } else if ("NUMBER" in results[0] && "NAME" in results[0]) {
          // Employee CSV Detected
          const formattedEmployees = results.map((employee) => ({
            uuid: employee.UUID,
            name: employee.NAME,
            number: employee.NUMBER,
            address: employee.ADDRESS,
          }));

          await Employee.insertMany(formattedEmployees);
          return res.json({ message: "Employee CSV Data Imported Successfully" });

        } else {
          return res.status(400).json({ message: "Invalid CSV format" });
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Server error while processing CSV" });
      }
    });
};

// Get Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error while fetching employees" });
  }
};

// Get Products (with optional filter)
const getProducts = async (req, res) => {
  try {
    const { size } = req.query;
    const products = size ? await Product.find({ size }) : await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

export { uploadCSV, getEmployees, getProducts };
