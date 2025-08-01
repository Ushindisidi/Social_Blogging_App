# 📰 Social Blog App – Frontend

This is the frontend of the Social Blog App – a modern blogging platform that allows users to register, create posts, comment, and engage with a community.

Built with **React**, **Tailwind CSS**, and **Flowbite React**, this app connects to a backend API for all functionality.

---

## 🚀 Getting Started

Follow these steps to set up the frontend locally:

### 1. Install dependencies

Make sure you have Node.js installed (v16+ recommended).

```bash
npm install
```

### 3. Set up environment variables
IGNORE FOR NOW, we'll use it later
Create a `.env` file in the root directory and add:

```env
VITE_API_URL=http://localhost:5000/api
```

Adjust the value depending on your backend URL.

### 4. Run the development server

```bash
npm run dev
```

The app should now be live at [http://localhost:5173](http://localhost:5173)

---

## 💠 Stack

* **React** – Frontend UI
* **Vite** – Fast dev/build tool
* **Tailwind CSS** – Utility-first styling
* **Flowbite React** – UI components
* **Axios** – API communication
* **React Router** – Routing/navigation

---

## 📁 Folder Structure

```
src/
│
├── components/      # Reusable UI components
├── pages/           # Route-based pages (Home, Login, Register, etc.)
├── assets/           
├── context/         # React context (AuthProvider, etc.)
├── App.jsx
└── main.jsx
```

---
