# 🎓 Digital School Platform

## 🚀 Streamlining Education Management with MERN Stack

---

### 📘 Project Description

The **Digital School Platform** is a modern, full-stack web application designed to streamline and centralize the management processes within educational institutions. Built with the **MERN stack**, it provides distinct dashboards and functionalities for **Administrators**, **Teachers**, and **Students**, fostering efficient communication, organization, and data management.

---

### ✨ Key Features

- 🔐 **User Authentication & Authorization**  
  Secure login and registration with **role-based access** for Admin, Teacher, and Student.

- 🧑‍💼 **Admin Dashboard**
  - Manage student, teacher, class, and subject records.
  - Oversee system settings and user accounts.
  - View complaints and post notices.

- 👨‍🏫 **Teacher Dashboard**
  - Manage students in assigned classes.
  - Take attendance and provide exam marks.
  - Submit complaints to Admin.

- 👨‍🎓 **Student Dashboard**
  - View subjects, attendance records, and exam marks.
  - Submit complaints.

- 📊 **Attendance Tracking**  
  Teachers record attendance; students view attendance percentages.

- 📝 **Performance Assessment**  
  Teachers provide marks and feedback. Students can track progress.

- 📈 **Data Visualization**  
  Interactive charts and tables for attendance and performance analysis.

- 💬 **Internal Communication**  
  Built-in system for feedback, complaints, and announcements.

- 📱 **Responsive Design**  
  Seamless usage across desktops, tablets, and mobile devices.

---

### 🛠️ Technologies Used

#### 🌐 Frontend
- React.js ⚛️  
- Redux Toolkit 🧠  
- Material-UI 🎨  
- Styled Components ✨  
- React Router DOM 🔀  
- Recharts 📊  

#### 🖥️ Backend
- Node.js 🟢  
- Express.js 🚂  
- Mongoose (MongoDB ODM) 🗃️  
- dotenv 🌱  
- cors 🌐  
- axios 🔗  

#### 🗄️ Database
- MongoDB (Cloud or Local) 🍃  

---

### 🧩 Installation Guide

> Follow the steps below to set up and run the project locally.

#### ✅ Prerequisites

- **Node.js & npm**: [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)
- **MongoDB**:
  - Local: [Community Server](https://mongodb.com/try/download/community)
  - Cloud (Recommended): [MongoDB Atlas](https://cloud.mongodb.com/)

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/Yogndrr/MERN-School-Management-System.git
cd MERN-School-Management-System
````

---

### 🔧 2. Backend Setup

```bash
cd backend
npm install  # or yarn install
```

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>.mongodb.net/<your_db>?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secure_jwt_key_123456

# Server Port
PORT=5001

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

---

### 💻 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install  # or yarn install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_BASE_URL=http://localhost:5001
```

Start the frontend:

```bash
npm start
```

Visit 👉 `http://localhost:3000`

---


#### 📍 Routes:

* `/Adminregister` – Register new Admin
* `/chooseasguest` – Access Guest Mode

---


### 📢 Contribution

Feel free to fork the repo and open Pull Requests for improvements or bug fixes!
💡 Suggestions are always welcome.