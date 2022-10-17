import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { nanoid } from "nanoid";
import * as urlsRepository from '../repositories/urlsRepository.js';

const shortedUrl = (req, res) => {
    const { id, url, userId, linksCount } = res.locals.data;

    try {
        const shortUrl = nanoid(8);
        urlsRepository.shortedUrls(url, shortUrl, id, userId, linksCount);
        
        return res.status(STATUS_CODE.CREATED).send({shortUrl,});
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const getShortUrlId = (req, res) => {
    const { data } = res.locals;

    try {
        return res.status(STATUS_CODE.OK).send(data);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const redirectUrl = (req, res) => {
    const { data } = res.locals;

    try {
        urlsRepository.redirectUrls(data.visitCount, data.id);
        return res.redirect(data.url);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const deleteUrl = (req, res) => {
    const { id } = req.params;
    const { linksCount, email} = res.locals.data;

    try {
        urlsRepository.deleteUrls(id, linksCount, email);

        return res.sendStatus(STATUS_CODE.DELETE)
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const listMyShortenedUrls = async (req, res) => {
    const { token } = res.locals;
    try {
        const result = await urlsRepository.listShortenedUrls(token.userId);
        
        return res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const listRanking = async (req, res) => {
    try {
        const result = await urlsRepository.ranking();
        
        return res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const getUserById = async (req, res) => {
    const { token } = res.locals;
    try {
        const result = await urlsRepository.getUser(token.userId);

        return res.status(STATUS_CODE.OK).send(result)
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR); 
    }
};

export { shortedUrl, getShortUrlId, redirectUrl, deleteUrl, listMyShortenedUrls, listRanking, getUserById };