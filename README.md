# NMISSION - Full-Stack E-Commerce Website.

> A complete, modern e-commerce web application for the fictional streetwear brand NMISSION. This project features a full user flow from viewing products to a multi-step, secure checkout process. It is built with a Node.js and Express backend, a MongoDB database, and a dynamic vanilla JavaScript front-end.



---

## 🌟 Core Features

### **Front-End**
*   **Product Detail Page:** Dynamically displays product information and allows users to select size and quantity.
*   **Dynamic Shopping Cart:** A modern, "frosted glass" UI where users can view items, update quantities, or remove products.
*   **Client-Side State:** Uses `localStorage` to persist the user's shopping cart and a guest session ID.
*   **Multi-Step Checkout Modal:** A seamless, single-page popup for entering a shipping address and selecting a payment method without leaving the cart.
*   **API Integration:** Communicates with the backend via the `fetch` API to process the final order.

### **Back-End**
*   **RESTful API:** A robust Express.js server that handles all business logic.
*   **User Authentication:** Secure endpoints for user signup and login.
*   **Order Processing:** An API endpoint (`/api/orders`) that validates checkout data, saves a permanent order to the database, and clears the user's active cart.
*   **Database Integration:** Uses Mongoose for elegant object data modeling (ODM) to interact with the MongoDB database.

---

## 💻 Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Server Dependencies:** `express`, `mongoose`, `cors`

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

*   **Node.js** installed on your machine (which includes `npm`).
*   **MongoDB** installed and running on your local machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nmission-project.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd nmission-project
    ```

3.  **Install NPM packages:**
    ```bash
    npm install express mongoose cors
    ```
    *(Note: If you re-add password hashing, also run `npm install bcrypt`)*

4.  **Start the server:**
    ```bash
    node server.js
    ```

5.  **View the application:**
    Open your web browser and navigate to `http://localhost:3000`. You should see the homepage.

---

## 📁 Project Structure


//

---

## 👥 Contributors

*   **Sai pattnaik** 
*   **Kanisk Chahar** 
*   **Nischay Mehta** 

You can also contribute to this project. Fork the repository and submit a pull request!

---

## 🔐 Security Note

The current version of this project stores user passwords in **plain text**, which is highly insecure and not recommended for production environments.

For a secure implementation, it is crucial to **hash passwords** using a library like `bcrypt`. The `server.js` file in the commit history contains a version with `bcrypt` implemented, which should be used as a reference for any real-world deployment.

---

## ⏭️ Future Improvements

*   **Integrate a Payment Gateway:** Add a real payment processing service like Stripe or PayPal.
*   **User Profiles:** Allow logged-in users to view their order history.
*   **Admin Panel:** Create a dashboard for administrators to add/edit products and manage orders.
*   **Front-End Framework:** Migrate the front-end to a modern framework like React or Vue.js for better state management and component reusability.```
