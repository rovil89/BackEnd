import express, {json} from "express";
import ProductManager from "./manager/ProductManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./manager/CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";


const app = express();
app.use(json());

app.use(express.static(__dirname + "/../public"));
const manager = new ProductManager(__dirname + "/Products.json");
const cartManager = new CartManager("/Carts.json");

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log("Fran aprobame el desafio!!!");
    // mensaje en terminal
    
socket.emit("messege", "Mensage de parte de Somos Pacifica!!!");
// mensaje en consola

socket.on("messege", (data) =>{
        console.log(data);});

        
});

export { manager, cartManager }