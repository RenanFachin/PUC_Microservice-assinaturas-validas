import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed() {
  await prisma.pagamento.deleteMany()

  for (let i = 0; i < 15; i++) {
    await prisma.pagamento.create({
      data: {
        codAssinatura: faker.string.uuid(),
        valorPago: Number(faker.finance.amount({ min: 5, max: 100 })),
        dataPagamento: faker.date.future(),
      },
    })
  }
}

seed().then(() => {
  console.log('✅ Database seeded')
})
