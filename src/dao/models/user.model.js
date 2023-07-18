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
        enum:["user","admin", "premium"],
        default: 'user',
    },
    documents:{
        type:[
            {
                name:{type:String, required:true},
                reference:{type:String, required:true}
            }
        ],
        default:[]
    },
    last_connection:{
        type: Date, //new Date()
        default: null
    },
    status:{
        type:String,
        required:true,
        enums:["completo","incompleto","pendiente"],
        default:"pendiente"
    },
    avatar:{type:String, default:""}
});

export const UserModel = mongoose.model(userCollection, userSchema);