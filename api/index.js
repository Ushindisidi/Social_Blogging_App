import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postsRoutes.js";
import categoryRoute from "./routes/categoriesRoutes.js";
import commentRoute from "./routes/commentsRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// CORS options
const corsOptions = {
  origin: ["https://yourfrontend.com", "http://localhost:3000",
    'http://localhost:3000',  
    'http://localhost:5173',  
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173'

  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','Cookie']
};
app.use(cors(corsOptions));

// Static files
app.use(express.static(path.join(__dirname, "public")));
// Database connection
// connectDB();
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
app.use("/api/comments", commentRoute);


// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
