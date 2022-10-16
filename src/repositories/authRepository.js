import { connection } from "../db/db.js";

function register(name, email, passwordHash){
    connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, 
    [name, email, passwordHash]);
}

function login(token, userId){
    connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, 
    [token, userId]);
}

export { register, login };