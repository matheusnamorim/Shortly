import express from "express";
import { validateSignUp } from "../middlewares/auth.middlewares.js";
import { registerUser } from "../controllers/auth.controllers.js";

const router = express.Router();
router.post('/signup', validateSignUp, registerUser);

export default router;