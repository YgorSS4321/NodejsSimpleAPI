import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./router/router";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
    port: 3333, 
}).then( () => {
    console.log("http server is running");

});













/*
type Message = {
    title: string,
    description: string,
}

function showMessage(msg: Message){
    console.log(msg);
}

showMessage({
    title: "titulo1",
    description: "mensagem comum",

})
*/

