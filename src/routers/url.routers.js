import express from "express";
import { getShortUrlId, shortedUrl } from "../controllers/urls.controllers.js";
import { validateToken } from "../middlewares/token.middlewares.js";
import { validateShortUrl, validateUrl } from "../middlewares/urls.middlewares.js";


const router = express.Router();

router.post('/urls/shorten', validateToken, validateUrl, shortedUrl);
router.get('/urls/:id', validateShortUrl, getShortUrlId);

export default router;