import { connection } from "../db/db.js";
import { signUpSchema } from "../schemas/schemas.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";

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

        const emailExist = (await connection.query('SELECT * FROM users WHERE email= ($1);', [email])).rows;
        if(emailExist.length !== 0) return res.status(STATUS_CODE.CONFLICT).send(MESSAGES.CONFLICT);

        res.locals.user = req.body;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { validateSignUp };