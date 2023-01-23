
import { User, UserProfile } from '@prisma/client'
import prisma from '~/prisma'
import { BaseResolver } from './BaseResolver'

export class UserResolver extends BaseResolver {
  public async users (): Promise<User[]> {
    return prisma.user.findMany()
  }

  public async user (id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  public async createUser (email: string): Promise<User | null> {
    return prisma.user.create({
      data: {
        email
      }
    })
  }

  public async userProfile (userId: string): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({
      where: {
        userId
      }
    })
  }

  public async setUserProfile (userId: string, input: UserProfile): Promise<UserProfile | null> {
    return prisma.userProfile.upsert({
      where: {
        userId
      },
      update: input,
      create: {
        ...input,
        userId
      }
    })
  }
}

export default UserResolver
