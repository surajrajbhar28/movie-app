

# ⚠️ **Important Note**


* The project was built in **2–3 days**, with a focus on **completing all required functionality**.
* Fully functional on desktop; mobile responsiveness and image upload (Cloudinary) were not included due to time constraints.
* No UI/UX design (Figma) was provided, so priority was given to **functionality**.
* All features mentioned in the assessment PDF have been successfully implemented.

---

# 🎬 Movie App — MERN Assessment Project

**Live Demo:** https://movie-app-frontend-8uts.onrender.com

### ⚠️ Note About Render Free Tier

If **nothing happens after Login or Signup**, it’s likely due to Render’s free-tier inactivity timeout.
Render automatically puts the service into “sleep mode” if there are **no requests for 5–6 hours**.

When this happens, the first request can take a while to wake the server.

👉 **If the server doesn’t respond after Login or Signup, please refresh the page and try again.**
You may need to reattempt the signup/login once the server is fully active.

---


| Role  | Email                                         | Password |
| ----- | --------------------------------------------- | -------- |
| Admin | [admin@gmail.com]() | 12345678 |
| User  | [user@gmail.com]()   | 12345678  |


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
* **React Hook Form** (form management for login, register, and movie forms)

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

* Stores user info 
* Manages login / register / logout
* Ensures protected route access

### **React Query**

* Fetch all movies
* Search movies
* Sort movies
* Pagination
* Add, Update, Delete movies (admin only)

### **React Hook Form**

* Manages forms efficiently (login, register, movie add/edit)
* Handles validation and form state

### **Screenshots**

#### Login
<img width="647" height="493" alt="image" src="https://github.com/user-attachments/assets/dfa7ef92-d540-4dbd-bd6f-da136df3b2bd" />


#### Home

<img width="1909" height="914" alt="image" src="https://github.com/user-attachments/assets/6537240a-011e-4faa-a70d-3d1c36e76bcc" />

#### Admin Home ( add movie option)

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/a76069e9-95d8-4e5f-a5c9-61f56902b9bf" />

#### Admin Movie Detail (edit and delete option)

<img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/6281da44-43cb-400a-b7fc-d9c0db3424e9" />

