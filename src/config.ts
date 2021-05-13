// Config must be flat. Without nested props
export interface IConfig {
  readonly controlHost: string
  readonly controlPort: number
  readonly mockHost: string
  readonly mockPort: number
  readonly originalHost: string
  readonly originalPort: number
}

export const DEFAULT_CONFIG: IConfig = {
  controlHost: 'localhost',
  controlPort: 8100,
  mockHost: 'localhost',
  mockPort: 8000,
  originalHost: 'localhost',
  originalPort: 8200
}
