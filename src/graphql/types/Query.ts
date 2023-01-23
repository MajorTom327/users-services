import UserResolver from '~/resolvers/UserResolver'

export const typeDefs = `#graphql
  type Query {
    hello: String
    user(id: ID!): User
  }`

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (_: any, args: { id: string }, context: any) => (new UserResolver(context)).user(args.id)
  }
}

export default {
  typeDefs,
  resolvers
}
