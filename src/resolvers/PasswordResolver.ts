import { BaseResolver } from './BaseResolver'
import bcrypt from 'bcryptjs'
import prisma from '~/prisma'
import { User } from '@prisma/client'
import { pathOr } from 'ramda'

export class PasswordResolver extends BaseResolver {
  private async encryptPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
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

  async checkPassword (userId: string, password: string): Promise<boolean> {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        password: {
          select: {
            hash: true
          }
        }
      }
    }).then(async (user) => {
      const userPassword = pathOr<string>('', ['password', 'hash'], user)
      return await bcrypt.compare(password, userPassword)
    })
  }
}
