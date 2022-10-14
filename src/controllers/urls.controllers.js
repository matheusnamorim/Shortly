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

export { shortedUrl };