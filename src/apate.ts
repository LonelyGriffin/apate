import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlClient} from './control-client'
import {HttpInterceptor} from './interceptor/http-interceptor'
import {HttpInterceptorBuilder} from './interceptor/http-interceptor-builder'
import {ControlServer, IControlServer} from './server/control-server'
import {IMockServer, MockServer} from './server/mock-server'

export class Apate {
  public client: ControlClient
  constructor(config?: Partial<IConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}

    this.mockServer = new MockServer(
      this.config.mockHost,
      this.config.mockPort,
      this.config.originalHost,
      this.config.originalPort
    )
    this.controlServer = new ControlServer(this.config.controlHost, this.config.controlPort, this.mockServer)
    this.client = new ControlClient(this.config)
  }

  async run() {
    await this.controlServer.run()
    await this.mockServer.run()
  }
  async shutdown() {
    await this.controlServer.shutdown()
    await this.mockServer.shutdown()
  }

  mockHttp(scope?: string) {
    return new HttpInterceptorBuilder(
      async (interceptor) => await this.client.queueHttpInterceptors(interceptor),
      scope
    )
  }

  async startHttpProxy() {
    await this.client.enableProxy()
  }
  async stopHttpProxy() {
    await this.client.disableProxy()
  }
  async capturedHttpRequestsAsInterceptors(): Promise<HttpInterceptor[]> {
    return await this.client.getCapturedInterceptors()
  }

  private config: IConfig
  private controlServer: IControlServer
  private mockServer: IMockServer
}
