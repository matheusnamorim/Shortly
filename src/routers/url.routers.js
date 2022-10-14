import express from "express";
import { shortedUrl } from "../controllers/urls.controllers.js";
import { validateToken } from "../middlewares/token.middlewares.js";
import { validateUrl } from "../middlewares/urls.middlewares.js";


const router = express.Router();

router.post('/urls/shorten', validateToken, validateUrl, shortedUrl);

export default router;