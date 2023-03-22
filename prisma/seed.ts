import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function run(){
    await prisma.seloPostal.deleteMany()
    await prisma.postCard.deleteMany()
    

    /*
    * create Selos and PostalCards
    */

    await Promise.all([

        
        
        prisma.seloPostal.create({
            data: {
                title: "title1",
                origin_place: "place1",
                tax: 12.25,
                post_card_id: 3,
            }
        }),
        
        
        prisma.seloPostal.create({
            data: {
                title: "title2",
                origin_place: "place2",
                tax: 6.25,
                post_card_id: 3,
                
            }
        }),
        

        prisma.postCard.create({
            data: {
                title: "some postalCard",
                description: "something about postalCard",
                image_url: "image_url",
                created_at: new Date('2018-06-03T03:00:00.000'),
                id: 3,
            }
        }),
        
    ]);
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

