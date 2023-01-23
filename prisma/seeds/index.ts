import { PrismaClient } from '@prisma/client'
import Bluebird from 'bluebird'
import seedUser from './UserSeed'

export const seed = async (prisma: PrismaClient): Promise<void> => {
  await Bluebird.allSettled([
    seedUser(prisma)
  ])
}

export default seed
