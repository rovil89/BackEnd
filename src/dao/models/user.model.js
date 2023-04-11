import mongoose from "mongoose";

// aca se guardan los usuarios
const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password:String
});

export const UserModel = mongoose.model(userCollection, userSchema);