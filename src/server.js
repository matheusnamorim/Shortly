import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth.routers.js';
import urlRouter from './routers/url.routers.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(urlRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});