import UserResolver from '~/resolvers/UserResolver'
import { DateTime } from 'luxon'
import { User } from '@prisma/client'

export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    profile: UserProfile
    createdAt: String!
    updatedAt: String!
  }
`

export const resolvers = {
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    profile: (parent: User, _: any, context: any) => (new UserResolver(context)).userProfile(parent.id),
    createdAt: (parent: User) => DateTime.fromJSDate(parent.createdAt).toISO(),
    updatedAt: (parent: User) => DateTime.fromJSDate(parent.updatedAt).toISO()
  }
}

export default {
  typeDefs,
  resolvers
}
