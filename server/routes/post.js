import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/create", createPost);
router.post("/delete", deletePost);
router.post("/like", likePost);

export default router;
