// =================================================================
// NMISSION E-COMMERCE BACKEND - FINAL SERVER SCRIPT
// (Plain Text Password Version - Not Recommended for Production)
// =================================================================
console.log("--- SERVER.JS V3 --- RUNNING LATEST VERSION ---");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// bcrypt has been removed.

// --- MODEL IMPORTS ---
// Ensure your model files are located in a 'models' subfolder.
import User from "./models/user.js";
import Cart from "./models/iteams.js";
import Order from "./models/order.js";

const app = express();
const port = 3000;

// -------------------- CORE CONFIGURATION & MIDDLEWARE --------------------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// -------------------- MONGODB DATABASE CONNECTION --------------------
mongoose.connect("mongodb://127.0.0.1:27017/loginSystem")
  .then(() => console.log("✅ MongoDB successfully connected."))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// -------------------- HTML PAGE SERVING ROUTES --------------------
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/products", (req, res) => res.sendFile("products.html", { root: "public" }));
app.get("/product-detail", (req, res) => res.sendFile("product-detail.html", { root: "public" }));
app.get("/cart", (req, res) => res.sendFile("cart.html", { root: "public" }));


// -------------------- AUTHENTICATION ROUTES (PLAIN TEXT) --------------------

/**
 * SIGNUP ROUTE
 * Handles new user registration, saving the password as plain text.
 */
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User with this email already exists.");
    }
    // Save the user with the plain text password
    await User.create({ email, password });
    console.log(`New user signed up: ${email}`);
    res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("An error occurred during signup.");
  }
});

/**
 * LOGIN ROUTE
 * Verifies user credentials by directly comparing the plain text passwords.
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    // Directly compare the password from the form with the one in the database
    if (user.password !== password) {
      return res.status(401).send("Incorrect password.");
    }
    console.log(`User logged in: ${email}`);
    res.redirect("/products");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("An error occurred during login.");
  }
});


// -------------------- CHECKOUT & ORDER API ROUTE --------------------

/**
 * CREATE ORDER API ENDPOINT
 * Receives checkout data, saves a permanent order, and clears the user's cart.
 */
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, paymentMethod, orderSummary, sessionId } = req.body;

    if (!sessionId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required order data." });
    }
    
    const newOrder = new Order({
      sessionId,
      customerInfo: customer,
      items,
      paymentMethod,
      orderSummary,
      status: 'Confirmed'
    });

    const savedOrder = await newOrder.save();
    await Cart.deleteMany({ sessionId });

    console.log(`✅ Order ${savedOrder._id} saved successfully!`);
    
    res.status(201).json({ success: true, message: "Order placed successfully!", orderId: savedOrder._id });

  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
});


// -------------------- START THE SERVER --------------------
app.listen(port, () => {
  console.log(`🚀 Server is live and running at http://localhost:${port}`);
});