# 🎓 Student Course Management System - Frontend

A modern React.js frontend application for the **Student Course Management System**. This application provides students with a clean and responsive interface to securely access courses, assignments, payments, and certificates by communicating with a Django REST Framework backend using JWT Authentication.

---

## 🚀 Features

- 🔐 JWT Authentication
- 🛡️ Protected Routes
- 📊 Student Dashboard
- 📚 View Available Courses
- 📝 View Assignments
- 💳 View Payments
- 🏆 View Certificates
- 🌐 REST API Integration using Axios
- ⚡ React Router Navigation
- 🎨 Responsive UI with Bootstrap

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Bootstrap 5
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend

- Django
- Django REST Framework
- Simple JWT
- MySQL

---

## 📂 Project Structure

```
src/
│
├── assets/
│
├── components/
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Courses.jsx
│   ├── Assignments.jsx
│   ├── Payments.jsx
│   └── Certificates.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔄 Application Flow

```
User Login
      │
      ▼
JWT Authentication
      │
      ▼
Access Token Stored in Local Storage
      │
      ▼
Protected Dashboard
      │
      ├──────────────┐
      ▼              ▼
Courses        Assignments
      │              │
      ▼              ▼
Payments     Certificates
```

---

## 📸 Modules Completed

- ✅ Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Dashboard
- ✅ Courses
- ✅ Assignments
- ✅ Payments
- ✅ Certificates

---

## 🔗 Backend Repository

This frontend communicates with the Django REST API backend.

➡️ **Backend Repository:**

https://github.com/Sindhu-Attili/Student-Course-Management-System

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Sindhu-Attili/Student-Course-Management-Frontend.git
```

### Navigate into the project

```bash
cd Student-Course-Management-Frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

## 📦 API Configuration

The frontend communicates with the Django backend using Axios.

Default API Base URL:

```javascript
http://127.0.0.1:8000/api/
```

---

## 📌 Project Status

🚧 **Currently Under Development**

Completed:

- Authentication
- Dashboard
- Courses Module
- Assignments Module
- Payments Module
- Certificates Module

Upcoming:

- Dashboard Statistics
- Search Functionality
- Filtering & Sorting
- Student Profile
- UI Enhancements
- Responsive Improvements
- Deployment

---

## 👨‍💻 Author

**Sindhu Attili**

GitHub:
https://github.com/Sindhu-Attili

---

⭐ If you found this project useful, feel free to star the repository!