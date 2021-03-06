import {IConfig} from './config'

export const mockServerUrl = (config: IConfig, path: string) => {
  const baseUrl = `http://${config.mockHost}`
  const url = new URL(path, baseUrl)

  url.port = config.mockPort.toString()

  return url.toString()
}

export const controlServerUrl = (config: IConfig, path: string) => {
  const baseUrl = `http://${config.controlHost}`
  const url = new URL(path, baseUrl)

  url.port = config.controlPort.toString()

  return url.toString()
}
