import { options } from "../config/options.js";

const PERSISTENCE = options.server.persistence;

let authDao;
let productsDao;

switch (PERSISTENCE) {
    case "mongo":
        //importaciones dinomicas
        const{connectDB}= await import("../config/dbConnection.js"); //el await funciona sin el async
        connectDB();
        const {UserMongo} =await import ("./managers/mongo/user.mongo.js");
        authDao = new UserMongo();
        const {ProductsMongo} =await import ("./managers/mongo/products.mongo.js");
        productsDao = new ProductsMongo();
        
        break;
    case "memory":
        const {UserMemory} = await import ("./managers/memory/user.memory.js");
        authDao = new UserMemory();
        const {ProductsMemory} = await import ("./managers/memory/products.memory.js");
        productsDao = new ProductsMemory();

        break;
    case "sql":

        break;
};

export {authDao, productsDao};