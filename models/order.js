// order.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // We can link to a registered user OR just use the guest session ID
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // This links to your User model
        required: false // Not required, allowing for guest checkouts
    },
    sessionId: {
        type: String,
        required: true
    },
    // The shipping/customer details collected from the form
    customerInfo: {
        name: String,
        phone: String,
        address: String,
        city: String,
        pincode: String
    },
    // A list of the products in the order
    items: [{
        productId: String,
        name: String,
        price: Number,
        size: String,
        quantity: Number
    }],
    // The final calculated amounts
    orderSummary: {
        subtotal: String,
        shipping: String,
        discount: String,
        total: String
    },
    paymentMethod: String,
    status: {
        type: String,
        default: 'Pending' // e.g., Pending, Shipped, Delivered, Canceled
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Order = mongoose.model("Order", orderSchema);
export default Order;