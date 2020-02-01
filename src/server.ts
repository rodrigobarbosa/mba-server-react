import express, {Application, NextFunction, Request, Response} from 'express';
import {HttpException} from "./exceptions/HttpException"
import mongoose from "mongoose"
import user from "./user/router"
import bodyParser from "body-parser";
import cors from "cors"

import config from '../config/config'

const server: Application = express();

mongoose.connect(`mongodb://localhost:27017/${config.database}`,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use("/users", user);
                                         
server.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status)
        .json({ status: err.status, message: err.message });
});

server.listen(9090,  () => {
    console.log(`'Servidor iniciado na porta ${config.serverPort}!'`);
});

export default server
