const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Routes
// ✅ Correct (lowercase 'routes')
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("loggedIn", true);
      document.getElementById("login").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      loadUserDetails(data.user.name);
      loadProducts();
      loadOrders();
      loadLowStockProducts();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Server error during login.");
  }
}

function loadUserDetails(name) {
  document.getElementById("userDetails").innerText = `Welcome, ${name}`;
}

async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();
    console.log("Products:", products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

async function loadOrders() {
  try {
    const response = await fetch("http://localhost:5000/api/orders");
    const orders = await response.json();
    const orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";

    orders.forEach(order => {
      const row = `<tr>
        <td>${order._id}</td>
        <td>${order.productName}</td>
        <td>${order.quantity}</td>
        <td>${order.orderTime}</td>
        <td>${order.status}</td>
      </tr>`;
      orderTableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  }
}

async function placeOrder(productName, quantity) {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productName, quantity })
    });

    const result = await response.json();

    if (response.ok) {
      loadOrders();
      loadProducts();
      loadLowStockProducts();
    } else {
      alert(result.message || "Order placement failed.");
    }
  } catch (error) {
    console.error("Order error:", error);
  }
}