import { ApolloServer } from '@apollo/server'
import { flatten, prop } from 'ramda'
import Query from './types/Query'
import Mutation from './types/Mutation'
import User from './types/User'
import UserProfile from './types/UserProfile'
import Password from './types/Password'
import UserProfileInput from './types/Inputs/UserProfileInput'
import { Context } from './context'

const types = [Query, Mutation, User, UserProfile, Password]
const inputs = [UserProfileInput]

const typeDefs = flatten([types, inputs]).map(prop('typeDefs'))
const resolvers = types.map(prop('resolvers'))
export const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers
})

export default apolloServer
