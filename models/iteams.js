import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  sessionId: String,
  productId: String,
  name: String,
  price: Number,
  size: String,
  quantity: Number,
  image: String
});

// IMPORTANT — export default
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
