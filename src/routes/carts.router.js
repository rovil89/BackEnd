import { Router, json } from "express";

const cartsRouter  = Router ();
cartsRouter.use(json());

let carts = [];




export default cartsRouter;