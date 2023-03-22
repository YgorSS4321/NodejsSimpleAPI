import { FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

export const prisma = new PrismaClient({
    log: ['query'],
});




export async function defaultReturn(request: FastifyRequest){

    return {
        name: "teste",
        age: "1234",
        extra: request.params
    };
}


export async function showPostalCards(request: FastifyRequest){
    const getPostalCardsSchema = z.object({
        title: z.string().min(2).max(100),
        description: z.string().max(600),
        image_url: z.string().url(),
        created_at: z.string().datetime()
    });


    


}

export async function showPostalCardById(request: FastifyRequest){
    return {
        name: "teste",
        age: "1234",
        extra: request.params
    };
}

export async function registerPostCard(request: FastifyRequest){
    
}

export async function deletePostCard(request: FastifyRequest){

}