import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlServer, IControlServer} from './control-server'
import {HttpMocker} from './http-mocker'
import {IMockServer, MockServer} from './mock-server'
import {mockServerUrl} from './utils'

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

  mockGet(path: string) {
    return this.mockHttp().withMethod('GET').withUrl(mockServerUrl(this.config, path))
  }

  private config: IConfig
  private controlServer: IControlServer
  private mockServer: IMockServer
}
