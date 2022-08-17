import { Router } from "express";
import { createPost, getAll, getById } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Get all posts
router.get("/", getAll);

// Get all posts
router.get("/:id", getById);

export default router;
