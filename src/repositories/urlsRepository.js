import { connection } from "../db/db.js";

function shortedUrls(url, shortUrl, id, userId, linksCount){
    connection.query(`INSERT INTO urls (url, "shortUrl", "sessionId", "userId") 
    VALUES ($1, $2, $3, $4);`, [url, shortUrl, id, userId]);

    connection.query(`UPDATE users SET "linksCount" = $1 WHERE id = $2;`
    , [linksCount+1, userId]);
};

function redirectUrls(visitCount, id){
    connection.query(`
    UPDATE urls SET "visitCount" = $1 WHERE urls.id = $2;
    `, [visitCount+1, id]);
};

export { shortedUrls, redirectUrls };