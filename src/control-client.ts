import fetch from 'node-fetch'
import {IConfig} from './config'
import {HttpInterceptor} from './interceptor/http-interceptor'
import {controlServerUrl} from './utils'

export class ControlClient {
  constructor(private config: IConfig) {}

  queueHttpInterceptors = async (...interceptors: HttpInterceptor[]) => {
    const body = JSON.stringify(interceptors.map((x) => x.serialize()))
    const url = controlServerUrl(this.config, '/http-interceptors')
    await fetch(url, {
      method: 'post',
      body,
      headers: {'Content-Type': 'application/json'}
    }).catch((e) => {
      debugger
    })
  }

  enableProxy = async () => {
    debugger
    await fetch(controlServerUrl(this.config, '/proxy/enable'))
  }

  disableProxy = async () => {
    await fetch(controlServerUrl(this.config, '/proxy/disable'))
  }

  getCapturedInterceptors = async () => {
    const res = await fetch(controlServerUrl(this.config, '/captured-proxy-interceptors'))

    const interceptorsJson = await res.json()

    return interceptorsJson.map((x: any) => HttpInterceptor.deserialize(x)) as HttpInterceptor[]
  }
}
