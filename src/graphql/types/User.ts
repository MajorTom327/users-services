import User from '~/entities/User'
import UserResolver from '~/resolvers/UserResolver'

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
    createdAt: (parent: User) => parent.createdAt,
    updatedAt: (parent: User) => parent.updatedAt
  }
}

export default {
  typeDefs,
  resolvers
}
