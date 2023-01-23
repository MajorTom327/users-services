import { PasswordResolver } from '~/resolvers/PasswordResolver'
import UserResolver from '~/resolvers/UserResolver'

export const typeDefs = `#graphql
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
    session(id: ID!): Session
  }`

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (_: any, args: { id: string }, context: any) => (new UserResolver(context)).user(args.id),
    users: (_: any, __: any, context: any) => (new UserResolver(context)).users(),
    session: (_: any, args: { id: string }, context: any) => (new PasswordResolver(context)).session(args.id)
  }
}

export default {
  typeDefs,
  resolvers
}
