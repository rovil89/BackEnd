import {CreateUserDto, GetUserDto} from "../dao/dto/user.dto.js";

export class UserRepository {
    constructor(dao) {
        this.dao = dao;
    };

    async getUsers(){
    const users = await this.dao.get();
    return users;
    };

    async createUser(user){
        const userDto = new CreateUserDto(user); 
        const userCreated = await this.dao.post(userDto);
        return userCreated;
    };

    async getUser(id){
        const user = await this.dao.getById(id);
        const result = new GetUserDto(user);
        return result;
    };
}