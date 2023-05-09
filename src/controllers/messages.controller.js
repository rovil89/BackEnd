import { MessageManager } from "../dao/index.js";

const messageManager = new MessageManager();

export const messageController = async (req, res) => {
    const messages = await messageManager.getAll();
    res.send(messages);
};

export const messagePostController = async (req, res) => {
    const {to, from, content, date } = req.body;

    // validacion
    if(!to || !from || !content || !date ) {
        return res
            .status(400)
            .send({ status: "error", payload: "Missing parameters" });
    }

    const result = await messageManager.create({
        to,
        from,
        content,
        date,
        messages: [],
    });

    res.status(201).send({ status: "ok", payload: result});
};