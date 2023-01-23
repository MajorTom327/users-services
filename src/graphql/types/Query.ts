import { PasswordResolver } from '~/resolvers/PasswordResolver'
import UserResolver from '~/resolvers/UserResolver'

export const typeDefs = `#graphql
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
    checkPassword(userId: ID!, password: String!): Boolean

  }`

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (_: any, args: { id: string }, context: any) => (new UserResolver(context)).user(args.id),
    users: (_: any, __: any, context: any) => (new UserResolver(context)).users(),
    checkPassword: (_: any, args: { userId: string, password: string }, context: any) => (new PasswordResolver(context)).checkPassword(args.userId, args.password)

  }
}

export default {
  typeDefs,
  resolvers
}
