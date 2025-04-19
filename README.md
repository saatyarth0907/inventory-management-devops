# 📦 Inventory Management System

An inventory management web application built with Node.js and MongoDB, containerized using Docker, and deployed on AWS EC2 with full DevOps lifecycle integration (CI/CD, monitoring, and logging).

---

## 🚀 Features

- 🔐 **Authentication** (Login & Session Handling)
- 📦 **Product & Order Management**
- 📊 **Low Stock Alerts**
- 🐳 **Dockerized Backend with MongoDB**
- ⚙️ **CI/CD Pipeline via GitHub Actions**
- 📈 **Monitoring & Logging with Prometheus & Grafana**
- ☁️ **Deployed on AWS EC2**

---

## 🧱 Tech Stack

| Layer         | Technology              |
|--------------|--------------------------|
| Backend       | Node.js + Express        |
| Database      | MongoDB                  |
| Containerization | Docker + Docker Compose |
| CI/CD         | GitHub Actions           |
| Deployment    | AWS EC2                  |
| Monitoring    | Prometheus + Grafana     |
| Logging       | Winston Logger           |

---

## 📁 Project Structure

```
inventory-management-devops/
🔹 inventory_backend/
🔺🔹 routes/
🔺🔹 models/
🔺🔹 utils/
🔺🔹 server.js
🔺🔹 Dockerfile
🔹 docker-compose.yml
🔹 prometheus.yml
🔹 README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management-devops.git
cd inventory-management-devops
```

### 2. Environment Variables

Create a `.env` file in `inventory_backend/`:

```
MONGO_URI=mongodb://mongo:27017/inventory
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

Services:
- Backend: `http://<EC2-IP>:80/api`
- MongoDB: `localhost:27017`
- Grafana: `http://<EC2-IP>:3000`
- Prometheus: `http://<EC2-IP>:9090`

---

## ✅ DevOps Lifecycle Implementation

| Stage                  | Tool(s) Used                               |
|------------------------|--------------------------------------------|
| Version Control        | Git + GitHub                               |
| Continuous Integration | GitHub Actions                             |
| Automated Testing      | Jest / Mocha / Supertest (Future Scope)    |
| Containerization       | Docker + Docker Compose                    |
| Deployment             | AWS EC2 (Manual/Script-based CD)           |
| Monitoring & Logging   | Prometheus + Grafana + Winston Logger      |

---

## 📊 Monitoring & Logging

- **Winston**: Used for backend request/response and error logging.
- **Prometheus**: Metrics exporter for Node.js via `/metrics`.
- **Grafana**: Visualizes metrics in real-time.

---

## 🧪 Sample API Endpoints

```bash
GET     /api/auth
POST    /api/auth/login
GET     /api/products
POST    /api/orders
```

---

## 📄 License

This project is licensed under the MIT License.

