import {HttpInterceptorBuilder} from './interceptor/http-interceptor-builder'
import {HttpInterceptor} from './interceptor/http-interceptor'

export class HttpMocker extends HttpInterceptorBuilder {
  constructor(private commitHandler = (interceptor: HttpInterceptor) => {}) {
    super()
  }

  commit() {
    const interceptor = this.buildInterceptor()

    this.commitHandler(interceptor)

    return interceptor
  }
}
