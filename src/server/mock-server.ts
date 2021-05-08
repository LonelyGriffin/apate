import bodyParser from 'body-parser'
import express, {Express, Request, Response} from 'express'
import {Server} from 'node:http'
import {IInterceptor} from '../interceptor/interceptor'

export interface IMockServer {
  run(): Promise<void>
  shutdown(): Promise<void>
  queueInterceptors(...interceptor: IInterceptor[]): void
}

export class MockServer implements IMockServer {
  constructor(private host: string, private port: number) {
    this.expressApp = express()

    this.expressApp.use(bodyParser.json())

    this.expressApp.all('/*', this.allRoutesHandler.bind(this))
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

  queueInterceptors(...interceptors: IInterceptor[]) {
    this.interceptorsQueue.push(...interceptors)
  }

  private expressApp: Express
  private expressServer?: Server
  private interceptorsQueue: IInterceptor[] = []

  private allRoutesHandler(req: Request, res: Response) {
    const scope = req.query['apate-scope']
    const matchedAndUnresolved = this.interceptorsQueue.find(
      (interceptor) => !interceptor.isResolved && interceptor.match(req) && scope === interceptor.scope
    )

    if (!matchedAndUnresolved) {
      throw 'Not found interceptor'
    }

    return matchedAndUnresolved.resolve(req, res)
  }
}
