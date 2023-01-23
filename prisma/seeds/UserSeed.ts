import type { PrismaClient } from '@prisma/client'

export const seedUser = async (prisma: PrismaClient): Promise<void> => {
  await prisma.user.create({
    data: {
      email: 'jconnor@sky.net',
      profile: {
        create: {
          firstname: 'John',
          lastname: 'Connor'
        }
      }
    }
  })
}

export default seedUser
