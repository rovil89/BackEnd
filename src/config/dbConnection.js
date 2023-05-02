import mongoose from "mongoose";
import { options } from "./options.js";

// Mongoose
export const connectDB = async () => { 
    await mongoose
        .connect(options.mongoDB.url)
        .then((conn) => {
            console.log("Conected to MongoDB!!");
        });
    }