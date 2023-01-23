import { Session } from '@prisma/client'
import prisma from '~/prisma'
import { DateResolverConvert } from '../helpers/DateResolverConvert'

export const typeDefs = `#graphql
  type Session {
    id: ID!
    userId: ID!
    createdAt: String!
    updatedAt: String!
    expiresAt: String!
    user: User!
  }
`

export const resolvers = {
  Session: {
    user: (parent: Session, _: any, __: any) => {
      return prisma.session.findUnique({ where: { id: parent.id } }).user()
    },
    id: (parent: Session, _: any, __: any) => parent.id,
    userId: (parent: Session, _: any, __: any) => parent.userId,
    createdAt: (parent: Session, _: any, __: any) => DateResolverConvert('createdAt')(parent),
    updatedAt: (parent: Session, _: any, __: any) => DateResolverConvert('updatedAt')(parent),
    expiresAt: (parent: Session, _: any, __: any) => DateResolverConvert('expiresAt')(parent)
  }
}

export default {
  typeDefs,
  resolvers
}
