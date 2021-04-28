import {HttpInterceptorBuilder} from './http-interceptor-builder'
import {HttpInterceptor} from './http-interceptor'

export class HttpMocker extends HttpInterceptorBuilder {
  constructor(private commitHandler = (interceptor: HttpInterceptor) => {}) {
    super({})
  }

  commit() {
    const interceptor = this.buildInterceptor()

    this.commitHandler(interceptor)

    return interceptor
  }
}
