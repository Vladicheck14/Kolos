import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getPosts);
router.post("/create", verifyToken, createPost);
router.post("/delete", verifyToken, deletePost);
router.post("/like", verifyToken, likePost);

export default router;
