import { Password } from '@prisma/client'
import { DateTime } from 'luxon'
import { DateResolverConvert } from '../helpers/DateResolverConvert'

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
    createdAt: (parent: Password) => DateResolverConvert('createdAt')(parent),
    updatedAt: (parent: Password) => DateResolverConvert('updatedAt')(parent)
  }
}

export default {
  typeDefs,
  resolvers
}
