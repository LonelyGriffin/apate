import fetch from 'node-fetch'
import {IConfig} from './config'
import {HttpInterceptor} from './interceptor/http-interceptor'
import {controlServerUrl} from './utils'

export class ControlClient {
  constructor(private config: IConfig) {}

  queueHttpInterceptors = async (...interceptors: HttpInterceptor[]) => {
    const body = JSON.stringify(interceptors.map((x) => x.serialize()))
    await fetch(controlServerUrl(this.config, '/http-interceptors'), {
      method: 'post',
      body,
      headers: {'Content-Type': 'application/json'}
    })
  }
}
