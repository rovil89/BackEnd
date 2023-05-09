import { Router, json } from "express";
import { CartsManager } from "../dao/index.js";
import {CartController, PostCartController, CartProductController, DeleteCartController, PutCartController, DeleteProductController, PutProductController} from "../controllers/carts.controller.js"


const cartsRouter  = Router ();
const cartManager = new CartsManager();
// cartsRouter.use(json());


cartsRouter.get("/", CartController );
cartsRouter.post("/", PostCartController);

// carrito
cartsRouter.post("/:cartId/:productId", CartProductController);
cartsRouter.delete("/:cartId", DeleteCartController);
cartsRouter.put("/:cartId", PutCartController);
cartsRouter.delete("/:cartId/products/:productId", DeleteProductController);
cartsRouter.put("/:cartId/products/:productId", PutProductController);



export default cartsRouter