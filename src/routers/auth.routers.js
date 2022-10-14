import express from "express";
import { validateLogin, validateSignUp } from "../middlewares/auth.middlewares.js";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/signup', validateSignUp, registerUser);
router.post('/signin', validateLogin, loginUser);

export default router;