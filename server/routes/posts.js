import { Router } from "express";
import { createPost, getAll, getById, getMyPosts } from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create post
router.post("/", checkAuth, createPost);

// Get all posts
router.get("/", getAll);

// Get post by id
router.get("/:id", getById);

// Get my posts
router.get("/user/me", checkAuth, getMyPosts);

export default router;
