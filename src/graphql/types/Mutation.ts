import { PasswordResolver } from '~/resolvers/PasswordResolver'
import UserResolver from '~/resolvers/UserResolver'

export const typeDefs = `#graphql
  type Mutation {
    createUser(email: String!): User
    setUserPassword(userId: ID!, password: String!): User
    setUserProfile(userId: ID!, input: UserProfileInput!): UserProfile
    login(email: String!, password: String!): Session
    logout(userId: ID, sessionId: ID): Boolean
  }
`
export const resolvers = {
  Mutation: {
    createUser: async (_: any, { email }: { email: string }, context: any) => (new UserResolver(context)).createUser(email),
    setUserPassword: async (_: any, { userId, password }: { userId: string, password: string }, context: any) => (new PasswordResolver(context)).setUserPassword(userId, password),
    setUserProfile: async (_: any, { userId, input }: { userId: string, input: any }, context: any) => (new UserResolver(context)).setUserProfile(userId, input),
    login: async (_: any, { email, password }: { email: string, password: string }, context: any) => (new PasswordResolver(context)).login(email, password),
    logout: async (_: any, { userId, sessionId }: { userId: string, sessionId: string }, context: any) => (new PasswordResolver(context)).logout({ userId, sessionId })
  }
}

export default {
  typeDefs,
  resolvers
}
