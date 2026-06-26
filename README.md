# 🎓 Student Course Management System - Frontend

A modern and responsive frontend application built with **React.js** for the Student Course Management System. It provides a clean user interface for students to access courses, assignments, payments, and certificates while securely communicating with a Django REST Framework backend using JWT authentication.

---

## 🚀 Features

* 🔐 JWT Authentication (Login)
* 🛡️ Protected Routes
* 📊 Student Dashboard
* 📚 View Available Courses
* 📝 View Assignments
* 💳 Payments Module *(In Progress)*
* 🏆 Certificates Module *(In Progress)*
* ⚡ Axios API Integration
* 🎨 Responsive UI using Bootstrap
* 🔄 React Router Navigation

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Bootstrap
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend

* Django
* Django REST Framework
* JWT Authentication
* MySQL

---

## 📂 Project Structure

```text
src/
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
└── main.jsx
```

---

## 🔄 Application Flow

```text
Login
   ↓
JWT Authentication
   ↓
Access Token Stored
   ↓
Protected Dashboard
   ↓
Courses
Assignments
Payments
Certificates
```

---

## 🔗 Backend Repository

The frontend communicates with the Django REST API backend.

Backend Repository:
(Add your backend GitHub repository link here)

---

## 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd student-course-management-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## 📌 Project Status

🚧 This project is currently under active development.

Completed Modules:

* ✅ Authentication
* ✅ Dashboard
* ✅ Courses
* ✅ Assignments

Upcoming Modules:

* Payments
* Certificates
* Student Profile
* Search & Filtering
* Dashboard Statistics
* UI Enhancements

---

## 👨‍💻 Author

**Sindhu Attili**
