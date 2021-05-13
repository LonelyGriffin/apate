import express, {Express, Request, Response} from 'express'
import {Server} from 'node:http'
import {HttpInterceptor} from '../interceptor/http-interceptor'
import {IMockServer} from './mock-server'
import bodyParser from 'body-parser'

export interface IControlServer {
  run(): Promise<void>
  shutdown(): Promise<void>
}

export class ControlServer implements IControlServer {
  constructor(private host: string, private port: number, private mockServer: IMockServer) {
    this.expressApp = express()

    this.expressApp.use(bodyParser.json())

    this.expressApp.get('/health', (_, res) => res.send('OK'))

    this.expressApp.post('/http-interceptors', this.handlePostHttpInterceptor)
    this.expressApp.post('/proxy/enable', this.handlePostProxyEnable)
    this.expressApp.post('/proxy/disable', this.handlePostProxyDisable)
    this.expressApp.post('/captured-proxy-interceptors', this.getCapturedProxyInterceptors)
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
  private handlePostHttpInterceptor = (req: Request, res: Response) => {
    const interceptors: HttpInterceptor[] = req.body.map((x: any) => HttpInterceptor.deserialize(x))
    this.mockServer.queueInterceptors(...interceptors)
    return res.send(200)
  }
  private handlePostProxyEnable = (req: Request, res: Response) => {
    debugger
    this.mockServer.enableProxy()
    return res.send(200)
  }

  private handlePostProxyDisable = (req: Request, res: Response) => {
    this.mockServer.disableProxy()
    return res.send(200)
  }

  private getCapturedProxyInterceptors = (req: Request, res: Response) => {
    const body = this.mockServer.getCapturedProxyInterceptors().map((interceptor) => interceptor.serialize())
    return res.send(body)
  }
}
