import { v4 as uuidv4} from "uuid";

export class UserMemory {
    constructor () {
        this.user = [
            {
                id: "e2885f81-719d-4627-a8d1-sdfgiuwrg7rgf",
                nombre: "Rodrigo Vildoza Pereira",
                telefono: "+54564627374",
                email: "rv@gmail.com",
            }
        ];
    };

    get() {
        return this.user;
    };

    post(user) {
        user.id =  uuidv4();
        this.user.push(user);
        return user;
    };

    async getById(id) {
        const user = this.user.find(u => u.id === id);
        if(!user) {
            throw new Error ("No se encontro al usuario")
        }
        return user;
    };
}