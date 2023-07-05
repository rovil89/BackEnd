import mongoose from "mongoose";
import ProductsManager from "../src/dao/db-managers/products.manager.js";
import Assert from "assert";

const assert = Assert.strict;

await mongoose.connect("mongodb+srv://rodrigovildoza:revp3242@rodrivp.xpq0vwj.mongodb.net/desafioTesting?retryWrites=true&w=majority"); 

describe("Testing para Products Model", () => {

    before(function(){
        this.productsDao = new ProductsManager();
    });


    it("El metodo getAll de products debe obtener los productos en formato de arreglo",async function(){
        const result = await this.productsDao.getAll();
        console.log(result);
        assert.strictEqual(Array.isArray(result), true); 
        
    });


    it("El metodo create debe crear un nuevo producto",async function(){
        let pacificaProducto = {
            title: "Pizzita",
            description: "Rica pizza",
            price: "2.500",
            stock: "142"
            
        };
        const result = await this.productsDao.create(pacificaProducto);
        console.log("result", result);
        assert.ok(result._id);
    });

    it("El metodo delete de products debe eliminar al producto segun su id",async function(){
        const result = await this.productsDao.delete();
        console.log(result);
        
    });


});
