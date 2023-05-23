import { Router, json } from "express";
import { CartsManager } from "../dao/index.js";
import { PurchaseController,CartController, PostCartController, CartProductController, DeleteCartController, PutCartController, DeleteProductController, PutProductController} from "../controllers/carts.controller.js"


const cartsRouter  = Router ();
const cartManager = new CartsManager();
// cartsRouter.use(json());


cartsRouter.get("/", CartController );
cartsRouter.post("/", PostCartController);
cartsRouter.put("/", PutCartController);
cartsRouter.post("/:cid/purchase", PurchaseController);

// carrito
cartsRouter.post("/:cartId/:productId", CartProductController);
cartsRouter.delete("/:cartId", DeleteCartController);
cartsRouter.delete("/:cartId/products/:productId", DeleteProductController);
cartsRouter.put("/:cartId/products/:productId", PutProductController);



export default cartsRouter