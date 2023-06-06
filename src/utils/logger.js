import winston from "winston";
import * as dotenv from "dotenv";
import __dirname from "../utils.js";
import path from "path";
dotenv.config();

const customLevels= {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'black'
    }
};

const devLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({ level: "debug"})
    ]
});

const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({filename: path.join(__dirname, "/logs/errors.log"), level: "error" }),
    ]
});


const currentEnv = process.env.NODE_ENV || "development";

export const addLogger = (req, res, next) => {
    if(currentEnv === "development"){
        req.logger = devLogger
    } else {
        req.logger = prodLogger
    }
    req.logger.http(`${req.url} - method: ${req.method}`);
    next();
}