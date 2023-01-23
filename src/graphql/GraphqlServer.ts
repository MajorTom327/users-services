import { ApolloServer } from '@apollo/server'
import { flatten, prop } from 'ramda'
import types from './types'
import inputs from './inputs'
import { Context } from './context'

const typeDefs = flatten([types, inputs]).map(prop('typeDefs'))
const resolvers = types.map(prop('resolvers'))
export const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers
})

export default apolloServer
