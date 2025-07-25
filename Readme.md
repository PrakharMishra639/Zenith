# Zenith Learning Management System (LMS)

A full‑stack MERN‑based Learning Management System with secure authentication, role‑based access, PayPal integration, and comprehensive admin & student workflows.

**Live Demo**

- Frontend: https://zenith-1-cbpu.onrender.com
- Backend API: https://zenith-irbo.onrender.com

## Overview

Zenith LMS provides a secure, scalable platform for online course delivery.

- **Admins** can create, update, and delete courses; upload videos; define curriculum; set pricing; and view enrollment analytics.
- **Students** can browse and filter courses, preview demos, purchase via PayPal, access protected content, and track progress.

## Features

- JWT & bcrypt.js authentication
- Role‑based access control (Admin / Student)
- Admin dashboard with course CRUD, Multer/Cloudinary uploads, and real‑time enrollment metrics
- Student portal with filtering (category, level, language), demo previews, PayPal checkout, and progress tracking
- Protected video streaming via Express middleware and React guards

## Tech Stack

**Frontend:** React (v19), Vite, Tailwind CSS, Radix UI (shadcn/ui), React Router v7, Axios, React Player  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, jsonwebtoken, bcryptjs, Multer, Cloudinary, PayPal REST SDK, CORS, dotenv

## Project Structure

```
Zenith_LMS/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── context/
│       ├── lib/
│       ├── pages/
│       ├── services/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── helpers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── README.md               # Project documentation
```

## Routes & Endpoints

**Auth**

- `POST /auth/register` — Register
- `POST /auth/login` — Login
- `GET /auth/check-auth` — Verify token

**Admin (Courses & Media)**

- `POST /instructor/course/add`
- `GET  /instructor/course/get`
- `GET  /instructor/course/get/details/:id`
- `PUT  /instructor/course/update/:id`
- `POST   /media/upload`
- `POST   /media/bulk-upload`
- `DELETE /media/delete/:id`

**Student (Courses, Orders, Progress)**

- `GET  /student/course/get`
- `GET  /student/course/get/details/:id`
- `GET  /student/course/purchase-info/:id/:studentId`
- `POST /student/order/create`
- `POST /student/order/capture`
- `GET  /student/course-progress/get/:userId/:courseId`
- `POST /student/course-progress/mark-lecture-viewed`
- `POST /student/course-progress/reset-progress`
- `GET  /student/courses-bought/get/:studentId`

## Quick Installation

1. **Clone**

   ```bash
   git clone https://github.com/PrakharMishra639/Zenith_LMS.git
   cd Zenith_LMS
   ```

2. **Backend**

   ```bash
   cd server
   npm install
   # create .env with MONGO_URI, JWT_SECRET, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, CLOUDINARY_* and CLIENT_URL
   npm run dev
   ```

3. **Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## Author

Prakhar Mishra  
GitHub: https://github.com/PrakharMishra639  
LinkedIn: www.linkedin.com/in/prakhar-mishra123
Email: mprakhar713@gmail.com
