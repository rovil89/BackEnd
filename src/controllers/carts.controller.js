import { CartsManager } from "../dao/index.js";

const cartManager = new CartsManager();

export const CartController = async (req, res) => {
    const carts = await cartManager.getAll();
    res.send(carts);
};

export const PostCartController = async (req, res) => {
    const {title, description, vendedor } = req.body;

    // validacion
    if(!title || !description || !vendedor ) {
        return res
            .status(400)
            .send({ status: "error", payload: "Missing parameters" });
    }

    const result = await cartManager.create({
        title,
        description,
        vendedor,
        products: [],
    });

    res.status(201).send({ status: "ok", payload: result});
};

export const CartProductController = async (req, res) => {
    const { cartId, productId } = req.params;

    const result = await cartManager.addProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};

export const DeleteCartController = async (req, res) => {
    const { cartId } = req.params;

    const result = await cartManager.deleteProducts(cartId);

    res.send({ status: "ok", payload: result});
};

export const PutCartController = async (req, res) =>{
    const { cartId, productId } = req.params;

    const result = await cartManager.updatedProducts(cartId, productId);

    res.send({ status: "ok", payload: result});
};

export const DeleteProductController = async (req, res) =>{
    const { cartId, productId } = req.params;

    const result = await cartManager.deleteProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};

export const PutProductController = async (req, res) =>{
    const { cartId, productId } = req.body;

    const result = await cartManager.updatedProduct(cartId, productId);

    res.send({ status: "ok", payload: result});
};