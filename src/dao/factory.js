import { options } from "../config/options.js";

const PERSISTENCE = options.server.persistence;

let authDao;

switch (PERSISTENCE) {
    case "mongo":
        //importaciones dinomicas
        const{connectDB}= await import("../config/dbConnection.js"); //el await funciona sin el async
        connectDB();
        const {UserMongo} =await import ("./managers/mongo/user.mongo.js");
        authDao = new UserMongo();
        
        break;
    case "memory":
        const {UserMemory} = await import ("./managers/memory/user.memory.js");
        authDao = new UserMemory();

        break;
    case "sql":

        break;
};

export {authDao};