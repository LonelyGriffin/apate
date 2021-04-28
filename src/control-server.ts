import {IHttpInterceptor} from './http-interceptor'
import express, {Express} from 'express'
import {Server} from 'node:http'

export interface IControlServer {
  run(): Promise<void>
  shutdown(): Promise<void>
}

export class ControlServer implements IControlServer {
  constructor(private host: string, private port: number) {
    this.expressApp = express()

    this.expressApp.get('/health', (_, res) => res.send('OK'))
  }

  async run() {
    if (this.expressServer) {
      return
    }

    await new Promise<void>((resolve, reject) => {
      this.expressServer = this.expressApp.listen(this.port, this.host, (err?: Error) =>
        err ? reject(err) : resolve()
      )
    })
  }
  async shutdown() {
    if (!this.expressServer) {
      return
    }

    await new Promise<void>((resolve, reject) => {
      this.expressServer?.close((err?: Error) => (err ? reject(err) : resolve()))
    })

    this.expressServer = undefined
  }

  private expressApp: Express
  private expressServer?: Server
}
