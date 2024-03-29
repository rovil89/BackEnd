import {UserManagerMongo} from "../dao/db-managers/userManagerMongo.js";
import { UserModel } from "../dao/models/user.model.js";
import { userService } from "../repository/index.js";

const userManager = new UserManagerMongo(UserModel);

export const deleteOldUsers = async () => {
    const users = await userManager.getAll();
    const today = new Date();
    const twoDays = new Date(today.getTime() - (48 * 60 * 60));
    const filtrarUsuarios = users.filter(user => user.last_connection >= twoDays);
    console.log(filtrarUsuarios);
    const idsToDelete = await filtrarUsuarios.map(user => {
        userManager.deleteUser(user._id);
        deleteCart(user.cart)
    });
    console.log(idsToDelete);
    return idsToDelete
};

export const deleteOldUsersCapture = async (req, res) => {
    const users = await deleteOldUsers();
    res.json({status:"success",payload: users})
};


const usersFiltered = async () => {
    const users = await userManager.getAll();
    const usersFiltered = users.map(user => {
        return {
        email: user.email,
        name: user.first_name,
        role: user.role
        }
    })
    console.log(usersFiltered);
    return usersFiltered
};

export const getUserController = async  (req, res) => {
    const users = await usersFiltered()
    console.log(users);
    res.json({status:"success",payload:users})
};


export const DocumentController = async(req,res)=>{
    try {
        const userId = req.params.uid;
        const user = await UserModel.findById(userId);
        if(user){
            console.log(req.files);
            const identificacion = req.files['identificacion']?.[0] || null; //el ? sirve para saber si el usuario mando el archivo o no
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificacion",reference:identificacion.filename});
            }
            if(domicilio){
                docs.push({name:"domicilio",reference:domicilio.filename});
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta",reference:estadoDeCuenta.filename});
            }
            if(docs.length === 3){
                user.status = "completo";
            } else {
                user.status = "incompleto";
            } // si el usuario subio los 3 doc, sale "completo", en el caso que falte 1 "incompleto"
            user.documents = docs;
            const userUpdated = await UserModel.findByIdAndUpdate(user._id,user);
            res.json({status:"success", message:"documentos actualizados"});

        } else {
            res.json({status:"error", message:"no es posible cargar los documentos"})
        }
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al cargar los documentos"})
    }
};

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