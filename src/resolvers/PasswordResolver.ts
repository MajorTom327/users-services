import { BaseResolver } from './BaseResolver'
import bcrypt from 'bcryptjs'
import prisma from '~/prisma'
import { Session, User } from '@prisma/client'
import { pathOr } from 'ramda'
import { isNilOrEmpty, isNotNil } from 'ramda-adjunct'
import { DateTime } from 'luxon'

export class PasswordResolver extends BaseResolver {
  private async encryptPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  private async comparePassword (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async setUserPassword (userId: string, password: string): Promise<User> {
    return await this.encryptPassword(password).then((hash) => {
      return prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: {
            upsert: {
              create: {
                hash
              },
              update: {
                hash
              }
            }
          }
        }
      })
    })
  }

  async login (email: string, password: string): Promise<Session | null> {
    return prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        password: {
          select: {
            hash: true
          }
        }
      }
    }).then(async (user) => {
      const hash = pathOr('', ['password', 'hash'], user)

      if (isNotNil(user) && await this.comparePassword(password, hash)) {
        const expiresAt = DateTime.local().plus({ days: 1 }).toJSDate()
        return prisma.session.upsert({
          where: {
            userId: user.id
          },
          update: {
            expiresAt
          },
          create: {
            userId: user.id,
            expiresAt
          }
        })
      }
      return null
    })
  }

  async logout ({ sessionId, userId }: { sessionId?: string, userId?: string }): Promise<boolean> {
    if (isNilOrEmpty(sessionId) && isNilOrEmpty(userId)) throw new Error('You must provide a sessionId or userId to logout')

    return prisma.session.deleteMany({
      where: {
        OR: [
          { id: sessionId },
          { userId }
        ]
      }
    }).then(() => true)
  }

  async session (sessionId: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: {
        id: sessionId,
        expiresAt: {
          gte: DateTime.local().toJSDate()
        }
      }
    })
  }

  async sessionForUser (userId: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: {
        userId,
        expiresAt: {
          gte: DateTime.local().toJSDate()
        }
      }
    })
  }
}
