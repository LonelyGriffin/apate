// Config must be flat. Without nested props
export interface IConfig {
  readonly controlHost: string
  readonly controlPort: number
  readonly mockProtocol: 'http'
  readonly mockHost: string
  readonly mockPort: number
}

export const DEFAULT_CONFIG: IConfig = {
  controlHost: 'localhost',
  controlPort: 8100,
  mockProtocol: 'http',
  mockHost: 'localhost',
  mockPort: 8000
}
