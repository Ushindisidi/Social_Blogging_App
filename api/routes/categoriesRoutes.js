import express from "express";
import Category from "../models/Category.js";
import {
  createCategories,
  getCategories,
} from "../controllers/categoriesController.js";

const router = express.Router();

// CREATE CATEGORY
router.post("/", createCategories);

// GET ALL CATEGORIES
router.get("/", getCategories);

export default router;
