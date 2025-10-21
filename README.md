# 🛒 E-Commerce Platform

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-orange)

A full-featured **MERN stack e-commerce platform** offering secure payments, media management, and a modern admin dashboard.  
Designed to deliver a **scalable, fast, and user-friendly online shopping experience**.

---

## 🚀 Features

- 🔐 **User Authentication** – Register and log in using JWT-based secure auth
- 🛍️ **Product Management** – Full CRUD operations with Cloudinary image uploads
- 💳 **Secure Payments** – Integrated with Razorpay for seamless transactions
- 🧾 **Admin Dashboard** – Manage users, products, and orders with Shadcn UI
- 📦 **Order Tracking** – View cart, wishlist, and order history in real time
- 🎨 **Modern Responsive UI** – Built with Tailwind CSS and optimized for all devices

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, Redux Toolkit, Tailwind CSS, Shadcn UI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Payments** | Razorpay |
| **Media Storage** | Cloudinary |
| **Tools** | Git, Postman |

---

## ⚙️ Installation & Setup

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```
git clone https://github.com/Sai-Srevan2004/E-commerce.git
cd E-commerce
```

### 2. Install Dependencies

```
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🔧 Environment Variables

Create separate `.env` files for both **frontend** and **backend** as shown below.

### 🖥️ Backend `.env`

```
# Server Configuration
PORT=YOUR_PORT

# MongoDB Connection URI
MONGO_URI=YOUR_MONGO_URI

# JWT Token Secret
JWT_SECRET=YOUR_JWT_SECRET

# Cloudinary Configuration
CLOUD_NAME=YOUR_CLOUDINARY_CLOUDNAME
API_KEY=YOUR_CLOUDINARY_APIKEY
API_SECRET=YOUR_CLOUDINARY_APISECRET

# Razorpay Credentials
RAZORPAY_KEY=YOUR_RAZORPAY_KEY
RAZORPAY_SECRET=YOUR_RAZORPAY_SECRET

# Mail SMTP Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=YOUR_MAIL_TO_SEND_EMAILS
MAIL_PASS=YOUR_MAIL_PASS
```

### 🌐 Frontend `.env`

```
VITE_BACKEND_URI=YOUR_BACKEND_URL
VITE_RAZORPAY_KEY=YOUR_RAZORPAY_KEY
```

---

## ▶️ Running the Project

Run both backend and frontend servers locally:

```
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm run dev
```

Once started, visit the frontend URL shown in your terminal (usually `http://localhost:5173`).

---

## 🧠 Key Highlights

- Optimized state management using **Redux Toolkit** with async thunks  
- Secure **JWT authentication** flow with refresh handling  
- **Cloudinary** media uploads and optimized image rendering  
- **Admin privileges** for CRUD operations across users, products, and orders  
- Fully **responsive design** with Tailwind CSS and Shadcn UI

---

## 📜 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project.

---

## 👨‍💻 Author

**Sai Srevan** – Full Stack Developer  
GitHub: [Sai-Srevan2004](https://github.com/Sai-Srevan2004)
```


