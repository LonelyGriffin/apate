import {HttpInterceptorResolver, IHttpMatchConfig, HttpInterceptor} from './http-interceptor'

export class HttpInterceptorBuilder {
  constructor(private matchConfig: IHttpMatchConfig = {}) {}
  withUrl(url: string) {
    this.matchConfig.url = url
    return this
  }

  withMethod(method: string) {
    this.matchConfig.method = method
    return this
  }

  withBody(body: string) {
    this.matchConfig.body = body
    return this
  }

  withHeader(name: string, value: string) {
    if (!this.matchConfig.headers) {
      this.matchConfig.headers = {}
    }
    this.matchConfig.headers[name] = value
    return this
  }

  withResponse(resolver: HttpInterceptorResolver) {
    this.resolver = resolver

    return this
  }

  buildInterceptor() {
    if (!this.resolver) {
      throw 'When the interceptor had been building, A response resolver was not set. You should use the withResponse method for example.'
    }
    return new HttpInterceptor(this.matchConfig, this.resolver)
  }

  private resolver?: HttpInterceptorResolver
}
