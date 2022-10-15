import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { nanoid } from "nanoid";

const shortedUrl = (req, res) => {
    
    const { id, url } = res.locals.data;

    try {
        const shortUrl = nanoid(8);
        
        connection.query(`INSERT INTO urls (url, "shortUrl", "sessionId") 
        VALUES ($1, $2, $3);`, [url, shortUrl, id]);
        
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
        connection.query(`
            UPDATE urls SET "visitCount" = $1 WHERE urls.id = $2;
        `, [data.visitCount+1, data.id]);

        return res.redirect(data.url);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const deleteUrl = (req, res) => {
    const { id } = req.params;
    try {
        connection.query(`
            DELETE FROM urls WHERE urls.id = $1;
        ;`, [id]);
        return res.sendStatus(STATUS_CODE.DELETE)
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const listMyShortenedUrls = (req, res) => {
    const { token } = res.locals;
    try {
        return res.send(token);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { shortedUrl, getShortUrlId, redirectUrl, deleteUrl, listMyShortenedUrls };