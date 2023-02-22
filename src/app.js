import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
const manager = new ProductManager("./Products.json");


app.get("/products", async (req, res)=>{

await manager.addProducts("Barrio Fino", "La pizza del Big Boss", 1200, "Sin Imagen", 3000, 300);
await manager.addProducts("Culebrita", "La pizza de la brita", 1200, "Sin Imagen", 150 ,  150);
await manager.addProducts("Doble Muzza", "Con Muzza y medio", 1500, "Sin Imagen", 5000, 335);

    try{
        const {limit} = req.query
        const products = await manager.getProducts();

        if (!limit){
            return res.send(products)
        } else {
            const productLimit = products.slice(0, limit);
            return res.send(productLimit);
        }
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
});

