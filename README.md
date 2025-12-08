

# ⚠️ **Important Note**

This project was completed within **2–3 days** as part of an assessment.
Due to the limited timeframe:

* The application is **not fully responsive** for small screens — **best viewed on desktop**.
* **Image upload** was not implemented because Cloudinary setup required additional time.
* No UI/UX design (Figma) was provided, so the main focus was completing **all required functionality**.
* All features mentioned in the assessment PDF have been fully implemented.

---

# 🎬 Movie App — MERN Assessment Project

**Live Demo:** https://movie-app-frontend-8uts.onrender.com

A full-stack **MERN** movie application with authentication, role-based access, movie CRUD operations, search, sorting, filtering, and pagination.

---

## 🚀 Tech Stack

### **Frontend**

* React
* **React Router** (navigation + protected routes)
* Redux Toolkit (auth & user state)
* React Query (movies fetching, search, sort, pagination, CRUD)
* Axios
* Material UI

### **Backend**

* Node.js
* Express
* MongoDB & Mongoose
* JWT (stored in HTTP-only cookies)
* Protected & role-based routes

---

## 🔐 Authentication & Authorization

* JWT-based Login, Register, Logout
* JWT stored securely in **HTTP-only cookies**
* Two roles:

  * **User** → Can only view movies
  * **Admin** → Can add, edit, delete, and view movies
* Protected backend routes
* Protected frontend routes using **React Router + Redux Toolkit**

---

## 🎥 Features

### ⭐ Common Features (User + Admin)

* View all movies
* View a single movie page
* Navigate across pages using **React Router**
* Search movies by:

  * Name
  * Description
* Sort movies by:

  * Rating
  * Duration
  * Released year
  * Name
* Sorting order:

  * Ascending
  * Descending
* Pagination

### 🔧 Admin-Only Features

* Add a new movie
* Edit movie details
* Delete movies

---

## 🧩 API Endpoints

### **Auth**

```
POST /auth/register
POST /auth/login
GET  /auth/logout
```

---

### 🎥 **Movies API**

#### **Get All Movies**

```
GET /movies
```

#### **Get Movies with Search, Sort, Order, Pagination**

```
GET /movies?search=&sort=&order=&page=
```

* `search=` → search by name or description
* `sort=` → rating | duration | released | name
* `order=` → asc | desc
* `page=` → page number

#### **Get Single Movie**

```
GET /movies/:id
```

#### **Add Movie (Admin)**

```
POST /movies
```

#### **Update Movie (Admin)**

```
PATCH /movies/:id
```

#### **Delete Movie (Admin)**

```
DELETE /movies/:id
```

---

## 🗂 Frontend Logic Overview

### **React Router**

* Handles page navigation
* Implements protected and role-based routes

### **Redux Toolkit**

* Stores user info & token
* Manages login / register / logout
* Ensures protected route access

### **React Query**

* Fetch all movies
* Search movies
* Sort movies
* Pagination
* Add, Update, Delete movies (admin only)


