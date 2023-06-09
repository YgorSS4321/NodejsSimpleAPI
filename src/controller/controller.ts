import { FastifyReply, FastifyRequest } from "fastify";

import { z } from 'zod';
import { equal } from "assert";
import { FastifyViewOptions } from "@fastify/view";


import { prisma } from "../model/prismaClient";





export async function showPostalCards(request: FastifyRequest){
    
    return await prisma.postCard.findMany({
        select: {
            title: true,
            description: true,
            image_url: true,

            selos: {
                select: {
                    title: true,
                    tax: true,
                }
            }

        }
        
    });
}

export async function showPostalCardById(request: FastifyRequest){
   const validateID = z.object({id: z.string().transform(id => Number(id))});

   const { id } = validateID.parse(request.params);
   
   return await prisma.postCard.findUnique({
        where: {
            id: id,
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
        image_url: z.string().url().nullable().optional(),
        created_at: z.string().datetime().nullable().optional(),
        selos: z.array(
            z.object({
                title: z.string().min(2).max(100),
                origin_place: z.string().max(200),
                tax: z.number().nonnegative()
            })
        ).optional()
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

export async function deletePostCardById(request: FastifyRequest){

    const validateID = z.object({
        id: z.string().transform(id => Number(id)).optional()
    })
    
    const { id } = validateID.parse(request.params);

    await prisma.postCard.delete({
        where: {
            id: id
        },
    })


}

export async function updateSeloPostalTax(request: FastifyRequest){
    
    const validateUpdateSchema = z.object({
        id: z.string().transform(id => Number(id)).optional(),
        tax: z.number().nonnegative()
    })

    type UpdateTaxSchemaInput = z.input<typeof validateUpdateSchema>
    type UpdateTaxSchemaOutput = z.output<typeof validateUpdateSchema>
    
    
    //request.body

    const {id, tax} = validateUpdateSchema.parse(request.body)


    await prisma.seloPostal.update({
        where: {
            id: id,
        },
        data: {
            tax: tax,
        }
    })


}


export async function renderHomePage(request: FastifyRequest, reply: FastifyReply){

    const allPostCards = await prisma.postCard.findMany({
        select: {
            title: true,
            description: true,
            image_url: true,

            selos: {
                select: {
                    title: true,
                    tax: true,
                }
            }

        }
        
    });

    //const allPostCardsByRaw = await prisma.$queryRaw`SELECT title, description, image_url FROM PostCard `;
    //return await reply.view("./src/views/home.pug", {youAreUsingPug: true, allPostC: allPostCardsByRaw});
    

    return await reply.view("./src/views/home.pug", {youAreUsingPug: true, allPostC: allPostCards});

}

export async function renderUnusedPages(request: FastifyRequest, reply: FastifyReply){
    return await reply.view("./src/views/unusedpages/home.pug", {youAreUsingPug: true});

}