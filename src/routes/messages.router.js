import { Router, json } from "express";
import { MessageManager } from "../dao/index.js";
import {messageController, messagePostController} from "../controllers/messages.controller.js";

const messagesRouter  = Router ();
const messageManager = new MessageManager();
// cartsRouter.use(json());


messagesRouter.get("/", messageController);
messagesRouter.post("/", messagePostController);