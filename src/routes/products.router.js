import { Router, json } from "express";

let products = [];

const productsRouter  = Router ();
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
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
});

productsRouter.get("/:pid", async (req, res)=>{

    try{
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        res.send(product)
    } catch(err) {
        res.status(404).send(`${err}`)
    }
});

productsRouter.post("/", async (req, res) => {
    try{ 
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    await manager.addProducts( title, description, code, parseInt(price), status, parseInt(stock), category, thumbnails );

    products = [...products, addProducts];
    res.send(products) 
                        } catch(err) {
        res.status(404).send(`${err}`)      
    }
});


productsRouter.put("/products/:pid", async (req, res) =>{
    try{
        const {pid} = req.params
        const id = parseInt(pid)
        await manager.updatedProducts(id, req.body)
    
        res.send({status: "succes", payload: await manager.getProductById(id)})
    }catch(err){
        res.status(404).send({status: "error", error: `${err}`})
    }
});

productsRouter.delete("/:pid", async(req, res)=>{
    try{
        const {pid} = req.params
        const id = parseInt(pid)
        await manager.deleteProducts(id)

        res.send({status: "succes", payload: "Producto eliminado"})
    } catch(err){
        res.status(404).send({status: "error", error: `${err}`})
    }
});


export default productsRouter;