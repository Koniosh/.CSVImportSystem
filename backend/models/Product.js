import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  flavour: String,
  size: String,
});

// Prevent overwriting model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
