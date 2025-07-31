import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import postRoute from './routes/posts.js';
import categoryRoute from './routes/categories.js';

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(express.json());

// CORS options
const corsOptions = {
  origin: ["https://yourfrontend.com", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log('✅ DB Connected'))
  .catch((err) => console.log(err));

// Routes
console.log("✅ Mounting auth route...");
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

// Root route
app.get('/', (req, res) => {
  console.log("✅ GET / route hit");
  res.status(200).send("Hello from backend. Life is Great on this side. T for Tough");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
