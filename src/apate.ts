import {DEFAULT_CONFIG, IConfig} from './config'
import {ControlServer, IControlServer} from './control-server'

export interface IApate {
  run(): Promise<void>
  shutdown(): Promise<void>
}

export class Apate implements IApate {
  constructor(config?: Partial<IConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}

    this.controlServer = new ControlServer(this.config.controlHost, this.config.controlPort)
  }

  async run() {
    await this.controlServer.run()
  }
  async shutdown() {
    await this.controlServer.shutdown()
  }

  private config: IConfig
  private controlServer: IControlServer
}
