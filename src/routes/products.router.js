import { Router } from "express";


const productsRouter  = Router ();
productsRouter.use(json());

productsRouter.get("/", (req, res) => {
    res.send(products);
});

let products = [];


export default productsRouter;