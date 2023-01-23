import express, { Application } from 'express'

export class Server {
  private readonly app: Application
  private readonly port: number

  constructor (port: number) {
    this.app = express()
    this.port = port
  }

  public start (): void {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`)
    })
  }
}

export default Server
