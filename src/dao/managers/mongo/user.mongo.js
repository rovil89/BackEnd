import { UserModel } from "../../models/user.model.js";

export class UserMongo {
    constructor () {
        this.model = UserModel;
    };

    async get(){
        try {
            return this.model.find(); //para obtener todos los contactos
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al obtener los contactos") 
        }
    };

    async post(contact){
        try {
            const userCreated = await this.model.create(contact);
            return userCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al crear los contactos") 
        }
    };

    async getById (){ //PARA BUSCAR UN CONTACTO POR EL ID
        try {
            const contact = await this.model.findById(id);
            if(!contact){
                throw new Error ("No se encontro al usuario") 
            }
            return contact;
        } catch (error) {
            console.log(error.message);
            throw new Error ("Hubo un error al buscar los contactos") 
        }
    };
}