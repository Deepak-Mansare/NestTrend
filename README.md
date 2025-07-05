# 🛍️ NestTrend

NestTrend is a full-stack MERN e-commerce project for an online clothing store, featuring a seamless shopping experience, payment integration, and modern UI.

---

## 🚀 Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Token)
- **Payments:** Razorpay (Test Mode)
- **Email Service:** Gmail SMTP via `nodemailer`

---

## 🔐 Features

- ✅ User Registration & Login with **JWT Authentication**
- 🔒 **Password hashing** with bcrypt
- 📧 **Email notifications** on Register & Payment (Gmail SMTP)
- 👕 Browse Products by Category (Men, Women, Kids)
- 🛒 Cart: Add, remove, update quantity
- 📦 Checkout flow with Address management
- 💳 Razorpay integration for test payments
- 📜 Order history and confirmation
- 🔒 Protected routes and localStorage token persistence
- ✨ Fully responsive and mobile-friendly

---

## 🔗 Live Demo

🌐 [Live Site (Netlify)](https://nesttrend-frontend.netlify.app)  
📂 [GitHub Repo (Frontend)](https://github.com/Deepak-Mansare/NestTrend/tree/main/frontend)  
📂 [GitHub Repo (Backend)](https://github.com/Deepak-Mansare/NestTrend/tree/main/backend)

---

## 🖼️ Screenshots

> These screenshots represent the core user journey of NestTrend:

### 🏠 Home Page (Product Listing)

![Home Page](https://raw.githubusercontent.com/Deepak-Mansare/NestTrend/main/frontend/public/images/readme/Home.png)

### 📄 Product Detail Page

![Product Detail](https://raw.githubusercontent.com/Deepak-Mansare/NestTrend/main/frontend/public/images/readme/ProductDetail.png)

### 🛒 Cart Page

![Cart](https://raw.githubusercontent.com/Deepak-Mansare/NestTrend/main/frontend/public/images/readme/Cart.png)

### ✅ Checkout Page

![Checkout](https://raw.githubusercontent.com/Deepak-Mansare/NestTrend/main/frontend/public/images/readme/Checkout.png)

### 📦 Order History Page

![Order History](https://raw.githubusercontent.com/Deepak-Mansare/NestTrend/main/frontend/public/images/readme/OrderHistory.png)

---

## 🛠️ Installation & Running Locally

### 1. Clone the repositories

```bash
git clone https://github.com/Deepak-Mansare/NestTrend-frontend.git
git clone https://github.com/Deepak-Mansare/NestTrend-backend.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend root with:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Then start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend root with:

```env
VITE_API_URL=http://localhost:3000
```

Then start the frontend dev server:

```bash
npm run dev
```
