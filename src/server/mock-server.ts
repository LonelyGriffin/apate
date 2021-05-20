import bodyParser from 'body-parser'
import express, {Express, Request, Response} from 'express'
import {Server} from 'node:http'
import {IInterceptor} from '../interceptor/interceptor'
import {HttpInterceptorBuilder} from '../interceptor/http-interceptor-builder'
import http from 'http'

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
    const scope = req.query['apate-scope']
    const matchedAndUnresolved = this.interceptorsQueue.find(
      (interceptor) => !interceptor.isResolved && interceptor.match(req) && scope === interceptor.scope
    )

    if (!matchedAndUnresolved) {
      if (!this.proxyEnabled) {
        throw 'Not found interceptor'
      }

      this.makeProxy(req, res)
      return
    }

    return matchedAndUnresolved.resolve(req, res)
  }

  makeProxy(origReq: Request, origRes: Response) {
    const options = {
      host: this.proxyHost,
      port: this.proxyPort,
      path: origReq.path,
      method: origReq.method,
      headers: origReq.headers
    }

    const req = http
      .request(options, (res) => {
        let bodyString = ''
        res.on('data', (chunk) => {
          bodyString += chunk
        })
        res.on('end', () => {
          const capturedInterceptor = new HttpInterceptorBuilder()
            .match({
              'method-exact': origReq.method,
              'path-exact': origReq.path
            })
            .resolveWith(
              (_, res, data: any) => {
                res.statusCode = data.statusCode
                res.statusMessage = data.statusMessage
                return res.send(data.body)
              },
              {
                statusCode: res.statusCode,
                statusMessage: origRes.statusMessage,
                body: bodyString
              }
            )
            .buildInterceptor()
          this.capturedProxyInterceptors.push(capturedInterceptor)

          capturedInterceptor.resolve(origReq, origRes)
          origRes.end()
        })
      })
      .on('error', (e) => {
        origRes.end()
      })

    req.end()

    origReq.on('data', (chunk) => req.write(chunk))
  }
}
