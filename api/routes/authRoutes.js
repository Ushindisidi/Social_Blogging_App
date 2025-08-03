import express from "express";
import {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
router.post("/reset-password", resetPassword); // Adjusted to match verifyResetCode

// Protected Routes
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", verifyToken, logout); // logout is typically protected

export default router;
