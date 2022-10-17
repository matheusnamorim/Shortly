import { connection } from "../db/db.js";

function shortedUrls(url, shortUrl, id, userId, linksCount){
    connection.query(`INSERT INTO urls (url, "shortUrl", "sessionId", "userId") 
        VALUES ($1, $2, $3, $4);`
    , [url, shortUrl, id, userId]);

    connection.query(`UPDATE users SET "linksCount" = $1 WHERE id = $2;`
    , [linksCount+1, userId]);
};

function redirectUrls(visitCount, id){
    connection.query(`
        UPDATE urls SET "visitCount" = $1 WHERE urls.id = $2;`
    , [visitCount+1, id]);
};

function deleteUrls(){
    connection.query(`
        DELETE FROM urls WHERE urls.id = $1;;`
    , [id]);

    connection.query(`
        UPDATE users SET "linksCount" = $1 WHERE email = $2;`
    , [linksCount-1, email]);
};

async function listShortenedUrls(userId){

    const dataHead = ( await connection.query(`
    SELECT users.id,
    users.name,
    SUM(urls."visitCount") AS "visitCount"
    FROM users
    JOIN urls ON users.id=urls."userId"
    WHERE urls."userId" = $1
    GROUP BY users.id;`
    , [userId])).rows;

    if(dataHead.length === 0){
        const data = ( await connection.query(`
            SELECT users.id,
            users.name
            FROM users
            WHERE users.id = $1;
        `, [userId])).rows[0];

        return {                
            ...data,
            visitCount: 0,
            shortenedUrls: []
        };
    }

    const dataBody = ( await connection.query(`
        SELECT urls.id,
        urls."shortUrl",
        urls.url,
        urls."visitCount"
        FROM users
        JOIN urls ON users.id=urls."userId"
        WHERE urls."userId" = $1;`
    , [userId])).rows;

    const data = {
        ...dataHead[0],
        shortenedUrls: [...dataBody]
    }
    return data;
};

async function ranking(){
    const list = ( await connection.query(`
        SELECT users.id, 
        users.name, 
        users."linksCount",
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id=urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `)).rows;
    return list;
}

async function getUser(userId){
    const user = ( await connection.query(`
        SELECT users.name FROM users
        WHERE users.id = $1;`
    , [userId])).rows[0];
    return user;
}

export { shortedUrls, redirectUrls, deleteUrls, listShortenedUrls, ranking, getUser };