import { connection } from "../db/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { MESSAGES } from "../enums/messages.js";

const registerUser = (req, res) => {
    try {
        return res.send('ok');
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
};

export {registerUser};