import mongoose from "mongoose";
import {cartModel} from "./carts.model.js";

// aca se guardan los usuar ios
const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required:true 
    },
    last_name: {
        type:String,
        required:true
    },
    nameComplete: {
        type: String,
        default: ''
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: cartModel
    },
    role: {
        type: String,
        required:true,
        enum:["user","admin"],
        default: 'user',
    }
});

export const UserModel = mongoose.model(userCollection, userSchema);