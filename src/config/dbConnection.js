import mongoose from "mongoose";
import { options } from "./options.js";

// Mongoose
    export const connectDB = async () => {
        try {
            await mongoose.connect(options.mongoDB.url);
            console.log("Conectado a la base de datos!!!");
        } catch (error) {
            console.log(`Hubo un error al conectar la base de datos ${error.message}`);
        }
    }