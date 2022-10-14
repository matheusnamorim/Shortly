import { urlSchema } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import { connection } from "../db/db.js";

async function validateUrl(req, res, next){
    
    const token = req.headers.authorization.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.TOKEN_NOT_FOUND);

    try {
        const validation = urlSchema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
            return;
        }
        const tokenExist = (await connection.query(
            `SELECT * FROM sessions WHERE token = ($1);`, [token])).rows;
        if(tokenExist.length === 0) return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.TOKEN_NOT_FOUND);

        res.locals.data = {id: tokenExist[0].id, url: req.body.url};
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { validateUrl };