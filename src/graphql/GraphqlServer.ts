import Query from './types/Query'
import { ApolloServer } from '@apollo/server'
import { prop } from 'ramda'

const types = [Query]

const typeDefs = types.map(prop('typeDefs'))
const resolvers = types.map(prop('resolvers'))
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

export default apolloServer
