import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { nanoid } from "nanoid";

const shortedUrl = (req, res) => {
    
    const { id, url, userId, linksCount } = res.locals.data;

    try {
        const shortUrl = nanoid(8);
        
        connection.query(`INSERT INTO urls (url, "shortUrl", "sessionId", "userId") 
        VALUES ($1, $2, $3, $4);`, [url, shortUrl, id, userId]);

        connection.query(`UPDATE users SET "linksCount" = $1 WHERE id = $2;`
        , [linksCount+1, userId]);
        
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

const listMyShortenedUrls = async (req, res) => {
    const { token } = res.locals;
    try {

        const dataHead = ( await connection.query(`
            SELECT users.id,
            users.name,
            SUM(urls."visitCount") AS "visitCount"
            FROM users
            JOIN urls ON users.id=urls."userId"
            WHERE urls."userId" = $1
            GROUP BY users.id;`
        , [token.userId])).rows;
        
        if(dataHead.length === 0){
            const data = ( await connection.query(`
                SELECT users.id,
                users.name
                FROM users
                WHERE users.id = $1;
            `, [token.userId])).rows[0];
            return res.status(STATUS_CODE.OK).send({
                ...data,
                visitCount: 0,
                shortenedUrls: []
            });
        }
        const dataBody = ( await connection.query(`
            SELECT urls.id,
            urls."shortUrl",
            urls.url,
            urls."visitCount"
            FROM users
            JOIN urls ON users.id=urls."userId"
            WHERE urls."userId" = $1;`
        , [token.userId])).rows;

        const data = {
            ...dataHead[0],
            shortenedUrls: [...dataBody]
        }

        return res.status(STATUS_CODE.OK).send(data);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const listRanking = async (req, res) => {
    let dif;
    try {
        const list = ( await connection.query(`
            SELECT users.id,
            users.name,
            users."linksCount",
            SUM(urls."visitCount") AS "visitCount"
            FROM users
            JOIN urls ON users.id=urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `)).rows;
        
        if(list.length < 10) {
            dif = 10 - list.length;
        
        const extraList = ( await connection.query(`
            SELECT users.id, users.name, users."linksCount" 
            FROM users 
            WHERE "linksCount" = 0 
            ORDER BY "linksCount" DESC
            LIMIT $1;
        `, [dif])).rows;
        
        const result = extraList.map(value => ({
            ...value, 
            shortenedUrls: "0"
        }));
        
        return res.status(STATUS_CODE.OK).send(list.concat(result));
        }
        else return res.status(STATUS_CODE.OK).send(list);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { shortedUrl, getShortUrlId, redirectUrl, deleteUrl, listMyShortenedUrls, listRanking };