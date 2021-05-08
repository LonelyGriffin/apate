import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlClient} from './control-client'
import {HttpInterceptorBuilder} from './interceptor/http-interceptor-builder'
import {ControlServer, IControlServer} from './server/control-server'
import {IMockServer, MockServer} from './server/mock-server'

export class Apate {
  public client: ControlClient
  constructor(config?: Partial<IConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}

    this.mockServer = new MockServer(this.config.mockHost, this.config.mockPort)
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

  mockHttp() {
    return new HttpInterceptorBuilder(async (interceptor) => await this.client.queueHttpInterceptors(interceptor))
  }

  private config: IConfig
  private controlServer: IControlServer
  private mockServer: IMockServer
}
