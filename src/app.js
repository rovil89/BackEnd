import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();

const manager = new ProductManager("./Products.json")

app.get("/products", async (req, res)=>{
    
    try{
        const {limit} = req.query
        const products = manager.getProducts();
        if (!limit){
            return res.send(products)
        } else {
            products.lenght = limit
            return res.send(products)
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
})