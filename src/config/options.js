import dotenv from "dotenv";
dotenv.config(); 
//busca el archivo .env toma esas variables y las pone en process.env que es quien ayuda a ejecutar la aplicacion

const PORT= process.env.PORT;
const MONGO_DB= process.env.MONGO_DB;
const SECRET_TOKEN= process.env.SECRET_TOKEN;
const COOKIE_TOKEN = process.env.COOKIE_TOKEN;

export const options = {
    fileSystem:{
        usersFileName: 'users.json',
        productsFileName: 'products.json',
    },
    mongoDB:{
        url:MONGO_DB
    },
    server:{
        port:PORT,
        secretToken:SECRET_TOKEN,
        cookieToken:COOKIE_TOKEN,
    }
};