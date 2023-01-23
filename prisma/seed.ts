import seed from './seeds'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

seed(prisma)
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
