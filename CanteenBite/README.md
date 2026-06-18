# 🍔 CanteenBite

<div align="center">

### A Cloud-Native College Canteen Ordering System

Modernizing campus food ordering through a scalable MERN architecture, secure online payments, automated cloud deployment, and real-time order management.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)

</div>

---

# 📖 Overview

CanteenBite is a full-stack MERN application designed to streamline college canteen operations by eliminating physical queues and digitizing the entire ordering workflow.

Students can browse menus, place orders, make secure online payments, and track order status through an intuitive web interface. Canteen staff can manage food items, monitor incoming orders, update order statuses, and verify completed orders through a dedicated administration dashboard.

The application is built using a modern cloud-native architecture and deployed on AWS using Docker containers and automated CI/CD pipelines.

---

# 🎯 Problem Statement

Traditional college canteens often experience:

* Long waiting queues during peak hours
* Manual order processing
* Payment handling inefficiencies
* Difficulty updating menu items
* Poor visibility into order status

These issues result in wasted student time and operational challenges for canteen staff.

---

# 💡 Solution

CanteenBite digitizes the entire ordering process by providing:

* Online menu browsing
* Digital cart management
* Secure online payments
* Automated order tracking
* Dedicated staff dashboard
* Cloud-hosted infrastructure
* Automated deployment pipelines

The platform significantly improves efficiency for both students and canteen operators.

---

# ✨ Key Features

## 🛒 Student Features

### User Authentication

* Secure registration and login
* JWT-based authentication
* Persistent user sessions

### Food Ordering

* Browse categorized food menus
* Add items to cart
* Update quantities
* Remove items from cart

### Payment Processing

* Secure Stripe payment integration
* Online checkout workflow
* Payment verification

### Order Tracking

* View order history
* Track current order status
* Access previous purchases

---

## 👨‍🍳 Admin Features

### Menu Management

* Add new food items
* Upload food images
* Update menu information
* Delete unavailable items

### Order Management

* View all incoming orders
* Manage customer requests
* Update order status
* Monitor completed orders

### Dashboard Operations

* Centralized management interface
* Real-time operational control
* Simplified order fulfillment workflow

---

## ⚙️ Backend Features

### RESTful API Architecture

* Modular Express.js architecture
* Scalable endpoint design
* Separation of concerns

### Database Integration

* MongoDB Atlas cloud database
* Optimized document storage
* Persistent order management

### Security

* JWT authentication
* Environment variable protection
* Secure payment processing

### File Uploads

* Multer integration
* Amazon S3 image storage
* Dynamic image retrieval

---

# 🏗️ System Architecture

The project is divided into three independent components:

## Frontend Application

```text
canteenbite_frontend/
```

Customer-facing React application.

### Responsibilities

* Menu browsing
* Cart management
* Checkout process
* Order tracking

---

## Admin Dashboard

```text
admin/
```

Dedicated React application for canteen staff.

### Responsibilities

* Food management
* Order monitoring
* Status updates
* Administrative operations

---

## Backend Server

```text
backend/
```

Node.js and Express API server.

### Responsibilities

* Authentication
* Database communication
* Payment processing
* Business logic
* Image management

---

# ☁️ Cloud Architecture

```text
                    GitHub Repository
                             │
         ┌───────────────────┴───────────────────┐
         ▼                                       ▼

 AWS Amplify Hosting                    GitHub Actions CI/CD

 ├── Customer Frontend                  Build Docker Image
 └── Admin Dashboard                    Push to Amazon ECR
                                                  │
                                                  ▼

                                    Amazon Elastic Container Registry
                                                  │
                                                  ▼

                                      Amazon EC2 Docker Host
                                                  │
                                                  ▼

                                      Express.js Backend API
                                                  │
                    ┌─────────────────────────────┴─────────────────────────────┐
                    ▼                                                           ▼

             MongoDB Atlas                                          Amazon S3 Bucket

             Database Layer                                      Food Image Storage
```

---

# 🚀 DevOps & Cloud Infrastructure

This project demonstrates practical cloud engineering and DevOps concepts.

### Infrastructure Components

* AWS Amplify for frontend hosting
* Amazon EC2 for backend hosting
* Amazon ECR for Docker image registry
* Amazon S3 for image storage
* MongoDB Atlas for cloud database management
* GitHub Actions for CI/CD automation

### Containerization

* Dockerized Node.js backend
* Consistent deployment environments
* Simplified infrastructure management

### Continuous Deployment

Every push to the main branch automatically:

1. Triggers GitHub Actions
2. Builds a Docker image
3. Pushes image to Amazon ECR
4. Connects to EC2 via SSH
5. Pulls latest image
6. Replaces running container
7. Deploys new application version

---

# 💻 Technology Stack

## Frontend

* React.js
* Vite
* Axios
* React Router

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

## Database

* MongoDB Atlas

## Payments

* Stripe API

## Cloud & DevOps

* AWS Amplify
* Amazon EC2
* Amazon ECR
* Amazon S3
* Docker
* GitHub Actions

---

# 📁 Project Structure

```text
CanteenBite
│
├── canteenbite_frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── admin
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── package.json
│
├── .github
│   └── workflows
│       └── deploy-backend.yml
│
└── README.md
```

---

# 🗄️ Database Collections

### Users

Stores:

* User credentials
* Profile information
* Delivery addresses

### Foods

Stores:

* Food names
* Categories
* Prices
* Image URLs
* Descriptions

### Orders

Stores:

* Ordered products
* User references
* Payment status
* Order status

---

# 🔌 API Endpoints

## Authentication

```http
POST /api/user/register
POST /api/user/login
```

## Food Management

```http
GET  /api/food/list
POST /api/food/add
POST /api/food/remove
```

## Orders

```http
POST /api/order/place
POST /api/order/userorders
POST /api/order/status
```

---

# 🚀 Local Installation

## Prerequisites

* Node.js 18+
* MongoDB Atlas Account
* Stripe Account

---

## Clone Repository

```bash
git clone https://github.com/Glen-C-John/CanteenBite.git

cd CanteenBite
```

---

## Backend Environment Variables

Create:

```bash
backend/.env
```

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

FRONTEND_URL=http://localhost:5173
```

---

## Frontend Environment Variables

Create:

```bash
canteenbite_frontend/.env
```

```env
VITE_API_URL=http://localhost:4000
```

---

## Admin Environment Variables

Create:

```bash
admin/.env
```

```env
VITE_API_URL=http://localhost:4000
```

---

## Run Backend

```bash
cd backend

npm install

npm run server
```

---

## Run Frontend

```bash
cd canteenbite_frontend

npm install

npm run dev
```

---

## Run Admin Dashboard

```bash
cd admin

npm install

npm run dev
```

---

# 🐳 Docker Deployment

Build image:

```bash
docker build -t canteenbite-backend .
```

Run container:

```bash
docker run -p 4000:4000 --env-file .env canteenbite-backend
```

---

# 📸 Screenshots

Add screenshots here after deployment.

### Home Page

![Home](screenshots/home.png)

### Menu Page

![Menu](screenshots/menu.png)

### Cart

![Cart](screenshots/cart.png)

### Admin Dashboard

![Admin](screenshots/admin-dashboard.png)

### Orders

![Orders](screenshots/orders.png)

---

# 🎓 Learning Outcomes

Through this project, the following concepts were implemented and explored:

* Full Stack MERN Development
* REST API Design
* Authentication & Authorization
* Cloud Computing
* Docker Containerization
* AWS Deployment
* GitHub Actions CI/CD
* Secure Payment Integration
* MongoDB Atlas Database Management
* Production Infrastructure Design

---

# 👨‍💻 Developer

**Glen John Chazhur**

Full Stack Developer

GitHub: https://github.com/Glen-C-John

---

# 🔮 Future Improvements

* Push notifications for order updates
* Analytics dashboard
* Multi-vendor support
* Mobile application version
* Advanced inventory management

---

# 🙏 Acknowledgements

* React Community
* Vite Team
* MongoDB Atlas
* Stripe
* AWS
* Docker
* GitHub Actions
