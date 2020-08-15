export type ApateHttpConfig = {
  mockHost: string
  mockPort: number
  controlHost: string
  controlPort: number
}

const DEFAULT_CONFIG: ApateHttpConfig = {
  mockHost: 'localhost',
  mockPort: 9000,
  controlHost: 'localhost',
  controlPort: 9100
}

export class ApateHttp {
  constructor(config: Partial<ApateHttpConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}
  }

  async startMock() {}
  async startControl() {}
  async start() {
    await this.startMock()
    await this.startControl()
  }

  async stopMock() {}
  async stopControl() {}
  async stop() {
    await this.stopMock()
    await this.stopControl()
  }

  private config: ApateHttpConfig
}
