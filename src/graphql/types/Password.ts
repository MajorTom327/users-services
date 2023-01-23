import { Password } from '@prisma/client'
import { DateTime } from 'luxon'

export const typeDefs = `#graphql
  type Password {
    id: ID!
    hash: String!
    createdAt: String!
    updatedAt: String!
  }
`

export const resolvers = {
  Password: {
    id: (parent: Password) => parent.id,
    hash: (parent: Password) => parent.hash,
    createdAt: (parent: Password) => DateTime.fromJSDate(parent.createdAt).toISO(),
    updatedAt: (parent: Password) => DateTime.fromJSDate(parent.updatedAt).toISO()
  }
}

export default {
  typeDefs,
  resolvers
}
