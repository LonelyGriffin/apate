import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlServer, IControlServer} from './control-server'
import {MockServer} from './mock-server'

export interface IApate {
  run(): Promise<void>
  shutdown(): Promise<void>
}

export class Apate implements IApate {
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

  private config: IConfig
  private controlServer: IControlServer
  private mockServer: IControlServer
}
