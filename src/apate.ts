import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlServer, IControlServer} from './server/control-server'
import {HttpMocker} from './http-mocker'
import {IMockServer, MockServer} from './server/mock-server'

export class Apate {
  constructor(config?: Partial<IConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}

    this.controlServer = new ControlServer(this.config.controlHost, this.config.controlPort)
    this.mockServer = new MockServer(this.config.mockHost, this.config.mockPort)
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
    return new HttpMocker((interceptor) => this.mockServer.queueInterceptor(interceptor))
  }

  private config: IConfig
  private controlServer: IControlServer
  private mockServer: IMockServer
}
