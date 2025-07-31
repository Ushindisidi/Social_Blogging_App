import express from "express";

import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// CREATE POST
router.post("/", createPost);
// UPDATE POST
router.put("/:id", updatePost);
// DELETE POST
router.delete("/:id", deletePost);
// GET POST
router.get("/:id", getPost);
// GET ALL POSTS
router.get("/", getAllPost);

export default router;
