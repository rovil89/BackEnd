import ProductManager from "./manager/ProductManager.js";
import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const manager = new ProductManager("./Products.json");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// app.get("/products", async (req, res)=>{

// await manager.addProducts("Barrio Fino", "La pizza del Big Boss", 1200, "Sin Imagen", 3000, 300);
// await manager.addProducts("Culebrita", "La pizza de la brita", 1200, "Sin Imagen", 150 ,  150);
// await manager.addProducts("Provolone", "Provolone y medio", 1500, "Sin Imagen", 5000, 335);
// await manager.addProducts("Muzza", "Muzzarella Tradicional", 1100, "Sin Imagen", 5001, 400);

//     try{
//         const {limit} = req.query
//         const products = await manager.getProducts();

//         if (!limit){
//             return res.send(products)
//         } else {
//             const productLimit = products.slice(0, limit);
//             return res.send(productLimit);
//         }
//     } catch (err){
//         res.status(404).send(`${err}`)
//     }
// })

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

