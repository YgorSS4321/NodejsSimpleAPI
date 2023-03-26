import { FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

export const prisma = new PrismaClient({
    log: ['query'],
});




export async function defaultReturn(request: FastifyRequest){

    return {
        name: "teste",
        someNumber: "1234",
    };
}


export async function showPostalCards(request: FastifyRequest){
    
    return await prisma.postCard.findMany({
        select: {
            title: true,
            description: true,
            image_url: true,

            selos: {
                select: {
                    title: true,
                }
            }

        }
        
    });
}

export async function showPostalCardById(request: FastifyRequest){
   const validateID = z.object({
    id: z.string().transform(id => Number(id))
   })

   const { id } = validateID.parse(request.params);
   
   return await prisma.postCard.findFirst({
        where: {
            id: {
                equals: id,
                
            },
        },
        select: {
            title: true,
            description: true,
            image_url: true,

            selos: {
                select: {
                    title: true,
                }
            }

        }
    });
}

export async function registerPostCard(request: FastifyRequest){
    
    const getPostalCardsSchema = z.object({
        title: z.string().min(2).max(100),
        description: z.string().max(600),
        image_url: z.string().url().nullable(),
        created_at: z.string().datetime().nullable()
    });

    const {title, description} = getPostalCardsSchema.parse(request.body);
    console.log(title);
    console.log(description);
    

    await prisma.postCard.create({
        data: {
            title: title,
            description: description,
        }
    })
    
    
}

export async function deletePostCard(request: FastifyRequest){

}