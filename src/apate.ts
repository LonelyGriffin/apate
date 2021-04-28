import {DEFAULT_CONFIG, IConfig} from './config'

export interface IApate {
  run(): Promise<void>
  shutdown(): Promise<void>
}

export class Apate implements IApate {
  constructor(config?: Partial<IConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}
  }

  async run() {}
  async shutdown() {}

  private config: IConfig
}
