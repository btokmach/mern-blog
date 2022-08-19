import { Router } from "express";
import { createPost, getAll, getById, getMyPosts, removePost, updatePost } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Get all posts
router.get("/", getAll);

// Get post by id
router.get("/:id", getById);

// Update post
router.put("/:id", checkAuth, updatePost);

// Get my posts
router.get("/user/me", checkAuth, getMyPosts);

// Remove post
router.delete("/:id", checkAuth, removePost);

export default router;
