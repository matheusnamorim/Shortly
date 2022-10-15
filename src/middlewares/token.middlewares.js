import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { connection } from "../db/db.js";

async function validateToken(req, res, next){
    const token = req.headers.authorization.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.TOKEN_NOT_FOUND);
    
    const tokenExist = (await connection.query(
        `SELECT * FROM sessions WHERE token = ($1);`, [token])).rows;
    if(tokenExist.length === 0) return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.TOKEN_NOT_FOUND);
    
    res.locals.token = tokenExist[0];
    next();
}

export { validateToken };