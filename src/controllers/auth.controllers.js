import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

const registerUser = (req, res) => {
    const { name, email, password } = res.locals.user;
    try {
        const passwordHash = bcrypt.hashSync(password, 10);

        connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, 
        [name, email, passwordHash]);

        return res.sendStatus(STATUS_CODE.OK);
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

const loginUser = (req, res) => {
    const { userId } = res.locals;
    try {
        const token = uuid();
        
        connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, 
        [token, userId]);
        
        return res.status(STATUS_CODE.OK).send({token,});
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export { registerUser, loginUser };