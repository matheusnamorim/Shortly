import { connection } from "../db/db.js";
import { signUpSchema, loginSchema } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import bcrypt from 'bcrypt';

async function validateSignUp(req, res, next){
    const {email, password, confirmPassword} = req.body;

    try {
        const validation = signUpSchema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
            return;
        }
        if(password !== confirmPassword) return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(MESSAGES.WRONG_PASSWORDS);

        const emailExist = (await connection.query('SELECT * FROM users WHERE email = ($1);', [email])).rows;
        if(emailExist.length !== 0) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.CONFLICT);

        res.locals.user = req.body;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

async function validateLogin(req, res, next){
    const {email, password} = req.body;

    try {
        const validation = loginSchema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const message = validation.error.details.map(value => value.message);
            res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
            return;
        }
        const userExist = (await connection.query(`SELECT * FROM users WHERE email = ($1);`, 
        [email])).rows;
        
        if(userExist.length === 0 || bcrypt.compareSync(password, userExist[0].password) === false ) return res.status(STATUS_CODE.UNAUTHORIZED).send(MESSAGES.NOT_FOUND);

        res.locals.userId = userExist[0].id;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { validateSignUp, validateLogin };