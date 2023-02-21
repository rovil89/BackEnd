import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();

const manager = new ProductManager("./Products.json")

// await manager.addProducts("Barrio Fino", "La pizza del Big Boss", 1200, "Sin Imagen", 3000, 300);
// console.log(await manager.getProducts());

// await manager.addProducts("Culebrita", "La pizza de la brita", 1200, "Sin Imagen", 150 ,  150);
// console.log(await manager.getProducts());

// await manager.addProducts("Doble Muzza", "Con Muzza y medio", 1500, "Sin Imagen", 5000, 335);
// console.log(await manager.getProducts());

app.get("/products", async (req, res)=>{
    
    try{
        const products = await manager.getProducts()
        const {limit} = req.query
    
        if (limit){
            products.length = limit
            return res.send(products)
        }
    
        res.send(products)
    } catch (err){
        res.status(404).send(`${err}`)
    }
})

app.get("/products/:pid", async (req, res)=>{

    try{
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        res.send(product)
    } catch(err) {
        res.status(404).send(`${err}`)
    }
})


app.listen(8080, () => {
    console.log("Server listening on port 8080");
})