import {json, Router} from "express";
import { manager } from "../app.js";

const router = Router();
router.use(json());


router.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", {products});
});

router.get("/real-time-products", async (req,res)=>{
    const products = await manager.getProducts()
    res.render("real-time-products", {products})
});



export default router;