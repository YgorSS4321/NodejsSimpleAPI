import { FastifyInstance } from "fastify";
import { defaultReturn, deletePostCard, registerPostCard, showPostalCardById, showPostalCards } from "../controller/controller";

export async function appRoutes(app: FastifyInstance){
    app.get("/", defaultReturn);
    app.get("/postcards", showPostalCards);
    app.get("/postcards/:id", showPostalCardById);
    app.post("/postcards/new", registerPostCard);
    app.delete("/postcards/:id/delete", deletePostCard);

}