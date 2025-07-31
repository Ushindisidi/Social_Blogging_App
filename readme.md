# Social Blog App

# API (BackEnd)

A RESTful API built with Node.js, Express, MongoDB, and JWT for authentication. It handles user registration, login, post creation, updating, deletion, and category management.

---

## 🚀 Features

- User registration & login (with hashed passwords)
- JWT-based authentication (recommended for enhancement)
- CRUD for blog posts
- Categorization of posts
- Modular routing for users, posts, auth, and categories
- MongoDB as the database

---

## 📦 Project Structure

```
api/
│
├── models/
│    └── verifyToken.js
│
├── models/
│   └── User.js
│   └── Post.js
│   └── Category.js
│
├── routes/
│   └── auth.js
│   └── users.js
│   └── posts.js
│   └── categories.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Boaz-marube/Social_Blogging_App.git
cd api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and add:

```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/blogdb
JWT_SECRET=your_jwt_secret_key
```


### 4. Start MongoDB

Ensure MongoDB is running locally:

```bash
mongod
```

You can also use MongoDB Compass if preferred (slower, optional).

### 5. Start the Server

```bash
npm run dev
```

Or in production:

```bash
node index.js
```

---

## 🧪 API Endpoints

| Method | Route                  | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Register a new user          |
| POST   | `/api/auth/login`      | Login with username/password |
| GET    | `/api/posts`           | Get all posts                |
| POST   | `/api/posts`           | Create a new post            |
| PUT    | `/api/posts/:id`       | Update a post by ID          |
| DELETE | `/api/posts/:id`       | Delete a post by ID          |
| GET    | `/api/categories`      | Get all categories           |
| POST   | `/api/categories`      | Add new category             |

---

## 👥 For Collaborators

To contribute:

1. Fork the repo and clone it.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add: your message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

> 📌 Follow consistent formatting and use environment variables where needed. Keep secrets out of the repo.

---


## 🧳 Future Improvements

- Add JWT token generation and auth middleware
- Validate duplicate email/username on registration
- Add pagination to posts
- Upload images with posts
- Add user role management

---
