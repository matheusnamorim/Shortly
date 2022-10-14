import express from "express";
import { shortedUrl } from "../controllers/urls.controllers.js";
import { validateUrl } from "../middlewares/urls.middlewares.js";

const router = express.Router();

router.post('/urls/shorten', validateUrl, shortedUrl);

export default router;