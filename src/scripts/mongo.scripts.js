import mongoose from "mongoose";
import { productsModel } from "../dao/models/products.model.js";
import { connectDB} from "../config/dbConnection.js";

connectDB();

//funcion para agregarle el owner a cada producto
const updateProducts = async () => {
    try {
        const adminId = "6491fba6fd126fbb07d97916"; //ponemos manualmente el id del usuario administrador, (del mongo sacamos el id)
        const result = await productsModel.updateMany({}, {$set:{owner:adminId}}); //actualiza a todos los productos
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
}
updateProducts();