import express from "express";
import { login, register, getInfo } from "../controllers/auth.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getInfo", verifyToken, getInfo);

export default router;
