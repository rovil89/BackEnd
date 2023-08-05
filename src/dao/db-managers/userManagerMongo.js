import { UserModel } from "../models/user.model.js";

class UserManagerMongo{
    constructor(model){
        this.model=model;
    };

    async addUser(user){
        try {
            const data = await this.model.create(user);
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al guardar: ${error.message}`);
        }
    };

    async getUserByEmail(email){
        try {
            const data = await this.model.findOne({email:email});
            const response = JSON.parse(JSON.stringify(data));
            return response;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    };

    getAll = async () => {
        const users = await UserModel.find().lean();

        return users;
    };

    create = async (user) => {
        const result = await UserModel.create(user);

        return result;
    };

    async deleteUser(userId) {
        try {
            const userToDelete = await userModel.findByIdAndDelete(userId)
            return userToDelete
        } catch (error) {
            return error;
        }
    }
}

export {UserManagerMongo};