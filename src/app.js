import express, {json} from "express";
import ProductManager from "./manager/ProductManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./manager/CartManager.js";
import cartsRouter from "./routes/carts.router.js";


const app = express();
app.use(json());

const manager = new ProductManager("./Products.json");
const cartManager = new CartManager("./Carts.json");


app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);


app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

export { manager, cartManager }