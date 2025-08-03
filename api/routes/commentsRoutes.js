import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
} from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create comment for a specific post
router.post("/posts/:id/", verifyToken, createComment);
router.get("/posts/:id/", getPostComments);
router.put("/comments/:commentId/like", verifyToken, likeComment);
router.put("/comments/:commentId", verifyToken, editComment);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;
