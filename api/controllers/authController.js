import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import crypto from "crypto";
import User from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // ✅ Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // jwt
    generateTokenAndSetCookie(res, newUser._id);

    // await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // ✅ Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Check password match
    console.log("Incoming password:", password);
    console.log("User password from DB:", user?.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Generate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // ✅ Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // ✅ Send response excluding password
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in login", error);
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// CHECK AUTH
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Check auth error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// FORGOT PASSWORD
// export const forgotPassword = async (req, res) => {
//   const { emailOrUsername } = req.body;
//   try {
//     const user = await User.findOne({
//       $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
//     });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

// 		// Generate reset token
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpiresAt = resetTokenExpiresAt;
//     await user.save();

//     res.status(200).json({ success: true, message: "Reset token generated", resetToken: token });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
export const forgotPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }

    // Just confirm username exists - no tokens needed
    res.status(200).json({
      success: true,
      message: "Username verified",
      userId: user._id, // Return user ID for the reset step
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// RESET PASSWORD
// export const resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or expired token" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password directly
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during password reset",
    });
  }
};
