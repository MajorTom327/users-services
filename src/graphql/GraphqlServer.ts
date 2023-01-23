import Query from './types/Query'
import User from './types/User'
import UserProfile from './types/UserProfile'
import { ApolloServer } from '@apollo/server'
import { prop } from 'ramda'

const types = [Query, User, UserProfile]

const typeDefs = types.map(prop('typeDefs'))
const resolvers = types.map(prop('resolvers'))
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

export default apolloServer
