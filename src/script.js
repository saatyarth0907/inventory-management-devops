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
        console.error("Error during login:", error);
        alert("Server error. Please try again later.");
    }
}

window.onload = function () {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("login").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    // Ensure data is loaded when the page is refreshed
    loadUserDetails();
    loadProducts();
    loadOrders();
    loadLowStockProducts();
};

function loadUserDetails(name) {
    document.getElementById("userDetails").innerText = `Welcome, ${name}`;
}

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();
        console.log("Products loaded:", products);
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
            let row = `<tr>
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

function loadLowStockProducts() {
    console.log("Low stock products loaded.");
}

async function placeOrder(productName, orderQuantity) {
    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productName, quantity: orderQuantity })
        });

        const result = await response.json();

        if (response.ok) {
            loadOrders();
            loadProducts();
            loadLowStockProducts();
        } else {
            alert(result.message || "Order failed");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order.");
    }
}

function submitOrder(event) {
    event.preventDefault();

    const productName = document.getElementById('orderProductName').value.trim();
    const orderQuantity = parseInt(document.getElementById('orderQuantity').value);

    if (productName && orderQuantity > 0) {
        placeOrder(productName, orderQuantity);
        updateOrderTable(); // Refresh orders after placing one
    } else {
        alert("Please enter a valid product name and quantity.");
    }

    document.getElementById('orderForm').reset();
}