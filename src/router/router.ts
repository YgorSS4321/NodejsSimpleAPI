import { FastifyInstance } from "fastify";
import { deletePostCardById, registerPostCard, renderHomePage, showPostalCardById, showPostalCards, updateSeloPostalTax } from "../controller/controller";

export async function appRoutes(app: FastifyInstance){
    app.get("/", renderHomePage);
    app.get("/postcards", showPostalCards);
    app.get("/postcards/:id", showPostalCardById);
    app.post("/postcards/new", registerPostCard);
    app.delete("/postcards/:id/delete", deletePostCardById);
    app.patch("/postcards/update", updateSeloPostalTax);

}