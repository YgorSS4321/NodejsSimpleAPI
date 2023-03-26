import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function run(){
    await prisma.seloPostal.deleteMany()
    await prisma.postCard.deleteMany()

    await Promise.all([

        prisma.postCard.create({
            data: {
                title: "titulo1",
                description: "something about the postalCard",
                selos: {
                    create: [
                        {
                            title: "selo1",
                            tax: 14.5,
                            origin_place: "correio",
                            //id: 33,
                        },
                        {
                            title: "selo2",
                            tax: 13.75,
                            origin_place: "Igreja Nova",
                            //id: 33,
                        },
                        {
                            title: "selo3",
                            tax: 13.75,
                            origin_place: "Olho Dágua Grande",
                            
                        }
                    ]
                }
            },

                
            
        }),

        prisma.postCard.create({
            data: {
                title: "titulo2",
                description: "something about the postcard",
                selos: {
                    create:{
                        title: "selo6",
                        tax: 6.25,
                        origin_place: "some place"
                    }
                }

            }
        })
        
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

