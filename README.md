<div align="center">
  <h1>🍔 CanteenBite</h1>
  <p><strong>A Full Stack MERN Application (College Canteen Ordering System)</strong></p>
  
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
  ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
</div>

---

## 📖 Project Description

**CanteenBite** is a comprehensive, full-stack digital solution for modernizing college canteen operations. It bridges the gap between students and canteen staff by providing an intuitive online platform to browse menus, place orders, and track them in real-time, completely eliminating the need for long physical queues.

## ⚠️ Problem Statement

Traditional college canteen ordering systems require students to stand in long queues, leading to wasted time between classes and chaotic environments during peak hours. Additionally, canteen staff face challenges in efficiently managing high volumes of orders, processing payments manually, and keeping the menu updated in real-time.

## 💡 Solution Overview

CanteenBite digitizes the entire ordering and fulfillment process. Students can seamlessly place orders and pay online from their devices, while canteen staff are empowered with a dedicated admin dashboard to manage inventory, track incoming orders, and update order statuses efficiently.

## ✨ Features

### 🛒 Customer Features
- **User Registration & Login:** Secure authentication with JWT.
- **Browse Food Menu:** Interactive categorized menu exploration.
- **Cart Management:** Add, remove, and adjust food item quantities.
- **Checkout & Place Orders:** Streamlined order placement.
- **Stripe Integration:** Secure online payment processing.
- **Order History & Tracking:** View past orders and track current order status in real-time.

### 👨‍🍳 Admin Features
- **Secure Admin Login:** Protected dashboard access for staff.
- **Menu Management:** Add, edit, or delete food items easily.
- **Image Uploads:** Upload enticing food images via Multer/S3.
- **Order Management:** View and manage all incoming customer orders.
- **Status Updates:** Dynamically change order statuses (e.g., *Preparing*, *Out for Delivery*, *Completed*).

### ⚙️ Backend Features
- **RESTful APIs:** Robust API architecture connecting all services.
- **MongoDB Database:** Efficient NoSQL data storage.
- **Authentication & Security:** JWT for secure access control.
- **Payment Processing:** Secure handling of Stripe webhooks/intents.
- **Image Upload Handling:** Seamless media processing.

## 🏗 System Architecture

The project consists of three distinct components:

1. **`canteenbite_frontend`**: Customer-facing React application.
2. **`admin`**: Canteen staff management React dashboard.
3. **`backend`**: Node.js/Express RESTful API server.

## 💻 Technology Stack

* **Frontend:** React.js, Vite
* **Admin Panel:** React.js, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Tokens)
* **Image Uploads:** Multer
* **Payments:** Stripe
* **Deployment:**
  * **Frontend & Admin:** AWS Amplify
  * **Backend:** Docker + Amazon ECR + Amazon EC2
  * **Image Storage:** Amazon S3 (Optional)

## 📁 Folder Structure

```text
CanteenBite/
│
├── canteenbite_frontend/      # React app for Customers
│
├── admin/                     # React app for Canteen Staff
│
├── backend/                   # Node.js/Express API Server
│
├── .github/
│   └── workflows/             # CI/CD Actions
│
└── README.md
```

## 🗄️ Database Design

Collections managed within **MongoDB Atlas**:
- **`Users`**: Stores student credentials, addresses, and profiles.
- **`Foods`**: Stores food item details, prices, categories, and image URLs.
- **`Orders`**: Stores transactional data, user associations, items ordered, and payment statuses.

## 🔌 API Overview

Here are a few examples of key REST API endpoints:

**Authentication**
- `POST /api/user/register` - Register a new customer
- `POST /api/user/login` - Authenticate customer & return JWT

**Food Menu**
- `GET /api/food/list` - Fetch all available food items
- `POST /api/food/add` - Add a new item (Admin)
- `POST /api/food/remove` - Delete an item (Admin)

**Orders**
- `POST /api/order/place` - Place a new order
- `POST /api/order/userorders` - Get orders for specific user
- `POST /api/order/status` - Update order status (Admin)

## 🚀 Installation Guide

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas URI
- Stripe Developer Account

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/CanteenBite.git
cd CanteenBite
```

### 2️⃣ Environment Variables Setup

Create a `.env` file in the respective directories and add the following keys:

**Backend (`backend/.env`)**
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

**Frontend (`canteenbite_frontend/.env`)**
```env
VITE_API_URL=http://localhost:4000
```

**Admin (`admin/.env`)**
```env
VITE_API_URL=http://localhost:4000
```

### 3️⃣ Local Development Setup

Open three separate terminal windows:

**Terminal 1: Start Backend**
```bash
cd backend
npm install
npm run server
```

**Terminal 2: Start Frontend**
```bash
cd canteenbite_frontend
npm install
npm run dev
```

**Terminal 3: Start Admin Panel**
```bash
cd admin
npm install
npm run dev
```

## 🐳 Docker Setup

To run the backend server inside a Docker container locally:

```bash
cd backend
# Build the Docker image
docker build -t canteenbite-backend .

# Run the container
docker run -p 4000:4000 --env-file .env canteenbite-backend
```

## ☁️ AWS Deployment Architecture

```text
GitHub Repository
        │
        ├── AWS Amplify
        │      ├── Frontend
        │      └── Admin
        │
        └── GitHub Actions (CI/CD Pipeline)
               │
               ▼
        Amazon ECR (Elastic Container Registry)
               │
               ▼
        Amazon EC2 (Running Docker Container)
               │
               ▼
        MongoDB Atlas (Database)
```

## 📸 Screenshots

| Customer Homepage | Admin Dashboard |
| :---: | :---: |
| ![Homepage Placeholder](https://via.placeholder.com/600x400?text=Customer+Homepage) | ![Admin Placeholder](https://via.placeholder.com/600x400?text=Admin+Dashboard) |
| **Shopping Cart** | **Order Tracking** |
| ![Cart Placeholder](https://via.placeholder.com/600x400?text=Shopping+Cart) | ![Tracking Placeholder](https://via.placeholder.com/600x400?text=Order+Tracking) |

*(Replace the placeholder URLs with actual screenshots of your application)*

## 🔮 Future Enhancements
- Implementation of a real-time chat between students and staff.
- Integration of push notifications for order updates.
- Advanced analytics dashboard for canteen revenue reporting.
- Support for multiple canteen vendors within the same campus.

## 🎓 Learning Outcomes
- Designing and implementing a complete micro-frontend/backend architecture.
- Processing secure payments via third-party providers (Stripe).
- Containerizing Node.js applications with Docker.
- Provisioning and deploying applications using AWS cloud infrastructure.
- Managing CI/CD pipelines via GitHub Actions.

## 🤝 Contributors
- **[Your Name]** - *Full Stack Developer* - [GitHub Profile](https://github.com/yourusername)

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements
- React and Vite communities for excellent frontend tooling.
- MongoDB Atlas for seamless cloud database management.
- Stripe for making payment integration straightforward.
