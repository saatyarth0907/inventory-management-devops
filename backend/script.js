function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "1234" && password === "1234") {
        localStorage.setItem("loggedIn", true);

        // Hide login and show main content
        document.getElementById("login").style.display = "none";
        document.getElementById("mainContent").style.display = "block";

        // Load necessary data after login
        loadUserDetails();
        loadProducts();
        loadOrders();
        loadLowStockProducts();
    } else {
        alert("Invalid Login Credentials");
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

function loadUserDetails() {
    document.getElementById("userDetails").innerText = "Welcome, User";
}

function loadProducts() {
    console.log("Products loaded.");
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";

    orders.forEach(order => {
        let row = `<tr>
            <td>${order.orderId}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>${order.orderTime}</td>
            <td>${order.status}</td>
        </tr>`;
        orderTableBody.innerHTML += row;
    });
}

function loadLowStockProducts() {
    console.log("Low stock products loaded.");
}

function placeOrder(productName, orderQuantity) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    let productIndex = products.findIndex(p => p.name.toLowerCase() === productName.toLowerCase());

    if (productIndex !== -1) {
        let availableQuantity = parseInt(products[productIndex].quantity);
        let orderQty = parseInt(orderQuantity);

        if (availableQuantity >= orderQty) {
            products[productIndex].quantity = availableQuantity - orderQty;

            let orderId = orders.length + 1;
            let orderTime = new Date().toLocaleString();

            let orderData = {
                orderId,
                productName,
                quantity: orderQty,
                orderTime,
                status: "Pending"
            };

            orders.push(orderData);

            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.setItem('products', JSON.stringify(products));

            loadProducts();
            loadOrders(); // Ensure new order appears in table
            loadLowStockProducts();
        } else {
            alert(`Insufficient stock! Only ${availableQuantity} left.`);
        }
    } else {
        alert("Product not found in inventory.");
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