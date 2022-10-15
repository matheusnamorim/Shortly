import { urlSchema } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { connection } from "../db/db.js";

async function validateUrl(req, res, next){
    const { token } = res.locals;
    const { url } = req.body;

    try {
        const validation = urlSchema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
            return;
        } 
        
        const emailExist = ( await connection.query(
            `SELECT users.email FROM sessions 
            JOIN users ON sessions."userId"=users.id
            WHERE sessions.token = ($1);`, [token.token]
        )).rows[0];
        
        const shortUrlExist = ( await connection.query(
            `SELECT * FROM urls
            JOIN sessions ON urls."sessionId"=sessions.id
            JOIN users ON sessions."userId"=users.id
            WHERE urls.url = ($1)
            AND users.email = ($2);`, [url, emailExist.email]
        )).rows;
        
        if(shortUrlExist.length !== 0 ) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.URL_EXIST);

        res.locals.data = {id: token.id, url: req.body.url};
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

async function validateUrlExist(req, res, next){
    const { id } = req.params;
    try {
        const url = ( await connection.query(
            `SELECT urls.id, urls."url", urls.url 
            FROM urls WHERE urls.id = ($1);`, [id]
        )).rows;
        if(url.length === 0 ) return res.status(STATUS_CODE.NOT_FOUND).send(MESSAGES.URL_NOT_FOUND);
        
        res.locals.data = url[0];
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

async function validateShortUrl(req, res, next){
    const { shortUrl } = req.params;

    try {
        const ShortUrl = ( await connection.query(
            `SELECT * FROM urls WHERE urls."shortUrl" = $1;`, [shortUrl]
        )).rows;
        if(ShortUrl.length === 0 ) return res.status(STATUS_CODE.NOT_FOUND).send(MESSAGES.SHORT_URL_NOT_FOUND);
        
        res.locals.data = ShortUrl[0];
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { validateUrl, validateUrlExist, validateShortUrl };