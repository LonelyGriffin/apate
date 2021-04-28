import {DEFAULT_CONFIG, IConfig} from './config'

export class Apate {
  constructor(config?: Partial<IConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
  }

  private config: IConfig
}
