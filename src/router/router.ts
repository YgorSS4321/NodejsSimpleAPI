import { FastifyInstance } from "fastify";
import { defaultReturn, deletePostCardById, registerPostCard, showPostalCardById, showPostalCards, updateSeloPostalTax } from "../controller/controller";

export async function appRoutes(app: FastifyInstance){
    app.get("/", defaultReturn);
    app.get("/postcards", showPostalCards);
    app.get("/postcards/:id", showPostalCardById);
    app.post("/postcards/new", registerPostCard);
    app.delete("/postcards/:id/delete", deletePostCardById);
    app.patch("/postcards/update", updateSeloPostalTax);

}