import { UserModel } from "../../models/user.model.js";

export class UserMongo {
    constructor () {
        this.model = UserModel;
    };

    async get(){
        try {
            return this.model.find(); //para obtener todos los usuarios
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al obtener los usuarios") 
        }
    };

    async post(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al crear los usuarios") 
        }
    };

    async getById (id){ //PARA BUSCAR UN CONTACTO POR EL ID
        try {
            const user = await this.model.findById(id);
            if(!user){
                throw new Error ("No se encontro al usuario") 
            }
            return user;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al buscar los usuarios") 
        }
    };
}