import express, { Application } from 'express'
import apolloServer from '~/graphql/GraphqlServer'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { json } from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { defaultTo, pathOr } from 'ramda'
import { Context } from '~/graphql/context'
import { isNilOrEmpty } from 'ramda-adjunct'
import { GraphQLError } from 'graphql'

export class Server {
  private readonly app: Application
  private readonly port: number

  constructor (port: number) {
    this.app = express()
    this.port = port

    this.configure()
  }

  configure (): void {
    if (process.env.NODE_ENV === 'production') this.app.use(helmet())
    this.app.use(compression())
    this.app.use(morgan('dev', {
      skip: (req, res) => req.baseUrl === '/graphql'
    }))
    this.app.use(cors())
    this.app.use(json())
  }

  public start (): void {
    apolloServer.start().then(() => {
      this.app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware<Context>(apolloServer, {
        context: async ({ req }): Promise<Context> => {
          const token = pathOr('', ['headers', 'authorization'], req)

          const tokenSecret = defaultTo('secret', process.env.AUTH_TOKEN_SECRET)

          if (isNilOrEmpty(token) || token !== tokenSecret) {
            throw new GraphQLError('User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 }
              }
            })
          }
          return { token }
        }
      }))

      this.app.listen(this.port, () => {
        console.log(`Server is listening on port ${this.port}`)
      })
    })
  }
}

export default Server
