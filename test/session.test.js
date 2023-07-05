import mongoose from "mongoose";
import { UserModel } from "../src/dao/models/user.model.js";
import { UserManagerMongo } from "../src/dao/db-managers/userManagerMongo.js";
import chai from "chai";

const expect = chai.expect;

describe("Testing para la clase Sessions", () => {
    before(async function(){
        await mongoose.connect("mongodb+srv://rodrigovildoza:revp3242@rodrivp.xpq0vwj.mongodb.net/desafioTesting?retryWrites=true&w=majority");
        this.usersMongo = new UserManagerMongo();
    });

    it("El metodo getAll de la clase Sessions debe obtener lo usuarios en formato de arreglo",async function(){
        const result = await this.usersMongo.getAll();//.get xq estamos probando el metodo get
        //console.log(result); //esto me da el []
        expect(result).to.be.deep.equal(result);
    });

    it("Session debe agregar un usuario correctamente en la base de datos",async function(){
        let pacificUser = {
            first_name: "Rodrigo",
            last_name: "Vildoza",
            email:"rorri311dd22@gmail.com",
            age: "34",
            password:"1234",
            role: "user"
        };
        const result = await this.usersMongo.create(pacificUser);
        // console.log("result", result);
        // assert.ok(result._id);
    });

});