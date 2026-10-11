# VeraTechLabs Full-Stack Management Platform

## Project Overview

VeraTechLabs Full-Stack Management Platform is a complete web application developed as the final project of the Full-Stack Development Track.

The platform centralizes company operations into a single secure system, allowing authenticated users to manage services, requests, documents, clients, projects, and project progress through role-based access control and interactive dashboards.

The application integrates frontend, backend, database, APIs, authentication, authorization, and file management into one cohesive solution.

---

# Main Features

## Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Protected APIs
- Session Management

---

## Role-Based Access Control (RBAC)

### Admin

Administrators can:

- Manage Services
- Manage Requests
- Manage Documents
- Manage Clients
- Manage Projects
- Assign Team Members
- Assign Clients
- Update Project Information
- Delete Projects
- Access Management Dashboard

### Team Member

Team Members can:

- View Assigned Projects
- View Dashboard
- Submit Service Requests
- Track Project Status

Restricted Actions:

- Create Clients
- Delete Clients
- Create Projects
- Delete Projects

---

## Service Management

Administrators can:

- Create Services
- Update Services
- Delete Services
- View All Services

---

## Service Requests

Users can:

- Submit Service Requests
- Track Requests
- View Request Status

Administrators can:

- Manage Requests
- Update Request Information
- Process Requests

---

## Document Management

Features:

- Upload Documents
- Store File Metadata
- Delete Documents
- Manage Uploaded Files

Supported Formats:

- PDF
- DOCX
- PNG
- JPG
- JPEG

---

## Client Management

Administrators can:

- Create Clients
- Update Clients
- Delete Clients
- View Client Directory

Client Information:

- Company Name
- Contact Person
- Email
- Phone Number

---

## Project Management

Administrators can:

- Create Projects
- Update Projects
- Delete Projects
- Assign Clients
- Assign Team Members

Project Information:

- Project Name
- Description
- Status
- Assigned Client
- Assigned Team Members

---

## Project Status Tracking

Project statuses include:

- Not Started
- In Progress
- Completed
- On Hold

Authorized users can update project progress and statuses.

---

## Dashboards

### User Dashboard

Displays:

- User Information
- Role Information
- Quick Access Navigation

### Project Dashboard

Displays:

- Total Projects
- Active Projects
- Completed Projects
- On Hold Projects

Project Overview:

- Project Status
- Assigned Client
- Assigned Team Members

---

# Technologies Used

## Frontend

- React.js
- React Router DOM
- CSS3
- Fetch API

## Backend

- Node.js
- Express.js
- JWT Authentication
- RBAC Middleware
- Multer

## Database

- MongoDB
- Mongoose

---

# Application Architecture

frontend/
│
├── components/
│ ├── Navbar.jsx
│ ├── PrivateRoute.jsx
│ └── AdminRoute.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── ServiceManagement.jsx
│ ├── RequestManagement.jsx
│ ├── RequestService.jsx
│ ├── DocumentManagement.jsx
│ ├── ClientsManagement.jsx
│ ├── ProjectsManagement.jsx
│ └── ProjectDashboard.jsx
│
└── App.jsx

backend/
│
├── models/
│ ├── User.js
│ ├── Service.js
│ ├── Request.js
│ ├── Document.js
│ ├── Client.js
│ └── Project.js
│
├── routes/
│ ├── auth.js
│ ├── serviceRoutes.js
│ ├── requestRoutes.js
│ ├── documentRoutes.js
│ ├── clientRoutes.js
│ └── projectRoutes.js
│
├── middleware/
│ ├── auth.js
│ ├── role.js
│ └── upload.js
│
└── server.js

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

---

## Services

GET /api/services

POST /api/services

PUT /api/services/:id

DELETE /api/services/:id

---

## Requests

GET /api/requests

POST /api/requests

PUT /api/requests/:id

DELETE /api/requests/:id

---

## Documents

GET /api/documents

POST /api/documents/upload

DELETE /api/documents/:id

---

## Clients

GET /api/clients

POST /api/clients

PUT /api/clients/:id

DELETE /api/clients/:id

---

## Projects

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id

---

# Database Collections

- users
- services
- requests
- documents
- clients
- projects

---

# Installation

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a .env file inside backend/

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Running the Project

Backend:

```bash
npm run dev
```

Runs at:

```text
http://localhost:5000
```

Frontend:

```bash
npm run dev
```

Runs at:

```text
http://localhost:5173
```

---

# Requirements Covered

✅ Authentication

✅ Authorization

✅ Role-Based Permissions

✅ Service Management

✅ Request Management

✅ File & Document Management

✅ Client Management

✅ Project Management

✅ Project Status Tracking

✅ Dashboard Analytics

✅ Frontend

✅ Backend

✅ Database

✅ API Communication

✅ MongoDB Integration

✅ Secure Routes

✅ Full CRUD Operations

---

# Author

Mays Ben Youssef

Full-Stack Development Track

Task 12 – Final Full-Stack Project

VeraTechLabs Management Platform