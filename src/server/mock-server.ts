import bodyParser from 'body-parser'
import express, {Express, Request, Response} from 'express'
import {Server} from 'node:http'
import {IInterceptor} from '../interceptor/interceptor'
import fetch from 'node-fetch'
import {HttpInterceptorBuilder} from '../interceptor/http-interceptor-builder'

export interface IMockServer {
  run(): Promise<void>
  shutdown(): Promise<void>
  queueInterceptors(...interceptor: IInterceptor[]): void
  enableProxy(): void
  disableProxy(): void
  getCapturedProxyInterceptors(): Readonly<IInterceptor[]>
}

export class MockServer implements IMockServer {
  constructor(private host: string, private port: number, private proxyHost: string, private proxyPort: number) {
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

  enableProxy() {
    debugger
    this.proxyEnabled = true
  }

  disableProxy() {
    this.proxyEnabled = false
  }

  getCapturedProxyInterceptors(): Readonly<IInterceptor[]> {
    return this.capturedProxyInterceptors
  }

  private expressApp: Express
  private expressServer?: Server
  private interceptorsQueue: IInterceptor[] = []
  private proxyEnabled = false
  private capturedProxyInterceptors: IInterceptor[] = []

  private async allRoutesHandler(req: Request, res: Response) {
    debugger
    const scope = req.query['apate-scope']
    const matchedAndUnresolved = this.interceptorsQueue.find(
      (interceptor) => !interceptor.isResolved && interceptor.match(req) && scope === interceptor.scope
    )

    if (!matchedAndUnresolved) {
      if (!this.proxyEnabled) {
        throw 'Not found interceptor'
      }

      const origRes = await fetch(req.url, {
        method: req.method,
        body: req.body
      })

      const capturedInterceptor = new HttpInterceptorBuilder()
        .match('method-exact', req.method)
        .andMatch('path-exact', req.path)
        .resolveWith(
          (_, res, data: any) => {
            res.statusCode = data.status
            res.statusMessage = data.statusText
            res.send(data.body)
            return res
          },
          {
            status: origRes.status,
            statusText: origRes.statusText,
            body: origRes.body
          }
        )
        .buildInterceptor()

      this.capturedProxyInterceptors.push(capturedInterceptor)

      return
    }

    return matchedAndUnresolved.resolve(req, res)
  }
}
