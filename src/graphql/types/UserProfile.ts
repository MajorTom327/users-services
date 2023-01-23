import { UserProfile } from '@prisma/client'

export const typeDefs = `#graphql
  type UserProfile {
    id: ID!
    firstname: String!
    lastname: String!
  }
`

export const resolvers = {
  UserProfile: {
    id: (parent: UserProfile) => parent.id,
    firstname: (parent: UserProfile) => parent.firstname,
    lastname: (parent: UserProfile) => parent.lastname
  }
}

export default {
  typeDefs,
  resolvers
}
