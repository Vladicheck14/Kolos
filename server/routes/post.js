import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  addComment,
  removeComment,
} from "../controllers/posts.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getPosts);
router.post("/create", verifyToken, createPost);
router.post("/delete", verifyToken, deletePost);
router.post("/like", verifyToken, likePost);
router.post("/addComment", verifyToken, addComment);
router.post("/removeComment", verifyToken, removeComment);

export default router;
