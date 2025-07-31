import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postsRoutes.js";
import categoryRoute from "./routes/categoriesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// CORS options
const corsOptions = {
  origin: ["https://yourfrontend.com", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

// Static files
app.use(express.static(path.join(__dirname, "public")));
// Database connection
connectDB();
// Routes
console.log("✅ Mounting auth route...");
app.get("/", (req, res) => {
  res.send("🚀 API is running!");
  console.log("Wagwan Wadau");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
