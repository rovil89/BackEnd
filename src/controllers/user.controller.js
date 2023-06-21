import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import { UserModel } from "../dao/models/user.model.js";

const userManager = new UserManagerMongo(UserModel);

export const PremiumController = async(req, res) => {
    try {
        const userId = req.params.uid;
        //verificar si el usuario existe en la base de datos
        const user = await UserModel.findById(userId);
        const userRol = user.rol;
        if(userRol === "user"){
            user.rol = "premium"
        } else if(userRol === "premium"){
            user.rol = "user"
        } else {
            return res.json({status: "error", message: "No es posible cambiar el rol del usuario"});
        } //cambiamo el rol del usuario depende el rol que tenga
        await UserModel.updateOne({_id: user._id}, user)//buscamos el usuario x id y le pasamos el nuevo dato
        res.send({status:"success", message:"Rol modificado"});
    } catch (error) {
        console.log(error.message); // para ver que pasó
        res.json({status:"error", message: "Hubo un error al cambiar el rol del usuario"})
    }
};