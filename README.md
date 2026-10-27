# 🌸 HerSpace — Women's Safety Web App

HerSpace is a web application designed with women's safety in mind. It provides a user authentication system with email and password login, Google sign-in, and a user dashboard.

## ✨ Features

- 🔐 User registration and login
- 🔑 Google authentication
- 👤 User dashboard
- 🛡️ Password hashing for account security
- 📱 Responsive web interface
- ☁️ Live frontend and backend deployment

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- JavaScript

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- MongoDB
- Mongoose

**Authentication & Security**
- Firebase Authentication
- Firebase Admin SDK
- bcrypt

**Deployment & Version Control**
- Vercel — Frontend hosting
- Render — Backend hosting
- Git and GitHub — Version control

## ⚙️ How It Works

1. Users register with their name, email, and password, or sign in using Google.
2. The frontend sends authentication requests to the backend API.
3. The backend validates credentials and interacts with MongoDB.
4. Firebase ID tokens are verified by the backend for Google sign-in.
5. After successful authentication, users are directed to the dashboard.

## 🚀 Live Demo

- **Frontend:** https://her-space-flax.vercel.app/
- **Backend:** https://herspace-qpl9.onrender.com/

## 💻 Run Locally

### Prerequisites
- Node.js and npm
- MongoDB connection
- Firebase project configured for Google authentication

### 1. Clone the repository

```bash
git clone https://github.com/vanshi678/HerSpace.git
cd HerSpace/client
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure environment variables

Configure the required environment variables in your local `.env` files for the frontend and backend. Use your own Firebase web configuration, MongoDB connection string, and Firebase Admin service-account credentials as required by the code.

**Never commit `.env` files or Firebase private keys to GitHub.**

### 4. Start the frontend

```bash
npm run dev
```

### 5. Start the backend

Open another terminal:

```bash
cd server
npm install
npm run dev
```

The exact environment-variable names and available scripts depend on your local configuration.

## 🔒 Security Notes

- Passwords are hashed before being stored.
- Google sign-in tokens are verified on the backend.
- Secret credentials should be stored in environment variables and never exposed publicly.

## 👩‍💻 Author

Developed as a project focused on women's safety and accessible web technology.

---

⭐ If you find this project interesting, consider giving the repository a star!
