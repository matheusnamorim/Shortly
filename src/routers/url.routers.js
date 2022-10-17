import express from "express";
import { deleteUrl, getShortUrlId, getUserById, listMyShortenedUrls, listRanking, redirectUrl, shortedUrl } from "../controllers/urls.controllers.js";
import { validateToken } from "../middlewares/token.middlewares.js";
import { validateId, validateShortUrl, validateUrl, validateUrlExist } from "../middlewares/urls.middlewares.js";


const router = express.Router();

router.post('/urls/shorten', validateToken, validateUrl, shortedUrl);
router.get('/urls/:id', validateUrlExist, getShortUrlId);
router.get('/urls/open/:shortUrl', validateShortUrl, redirectUrl);
router.delete('/urls/:id', validateToken, validateId, deleteUrl);
router.get('/users/me', validateToken, listMyShortenedUrls);
router.get('/ranking', listRanking);
router.get('/user', validateToken, getUserById);

export default router;