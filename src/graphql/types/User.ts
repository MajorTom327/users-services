import UserResolver from '~/resolvers/UserResolver'
import { User } from '@prisma/client'
import { DateResolverConvert } from '../helpers/DateResolverConvert'
import { PasswordResolver } from '~/resolvers/PasswordResolver'

export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    profile: UserProfile
    createdAt: String!
    updatedAt: String!
    session: Session
  }
`

export const resolvers = {
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    profile: (parent: User, _: any, context: any) => (new UserResolver(context)).userProfile(parent.id),
    createdAt: (parent: User) => DateResolverConvert('createdAt')(parent),
    updatedAt: (parent: User) => DateResolverConvert('updatedAt')(parent),
    session: (parent: User, _: any, context: any) => (new PasswordResolver(context)).sessionForUser(parent.id)
  }
}

export default {
  typeDefs,
  resolvers
}
