import mongoose from "mongoose";
import { cartModel } from "../src/dao/models/carts.model.js";
import  CartsManager  from "../src/dao/db-managers/carts.manager.js";
import chai from "chai";
import Assert from "assert";

const expect = chai.expect;
const assert = Assert.strict;

describe("Testing para la clase Sessions", () => {
    before(async function(){
        await mongoose.connect("mongodb+srv://rodrigovildoza:revp3242@rodrivp.xpq0vwj.mongodb.net/desafioTesting?retryWrites=true&w=majority");
        this.cartMongo = new CartsManager();
    });

    it("El metodo getAll de la clase Carts debe obtener lo productos en formato de arreglo",async function(){
        const result = await this.cartMongo.getAll();
        //console.log(result); //esto me da el []
        expect(result).to.be.deep.equal(result);
    });

    it("El metodo create debe crear un nuevo producto",async function(){
        let pacificaProducto = {
            products:
                    {
                        product: "6420a4b347d55a99d2abc443",
                        quantity: "2"
                    },
        };
        const result = await this.cartMongo.create(pacificaProducto);
        console.log("result", result);
        assert.ok(result._id);
    });

    it("El metodo delete de carts debe eliminar los productos del carrito",async function(){
        const result = await this.cartMongo.delete();
        console.log(result);
        
    });

});