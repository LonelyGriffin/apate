import {HttpInterceptorResolver, HttpInterceptor} from './http-interceptor'
import {IHttpMatcher} from './http-matcher'
import {Request} from 'express'
import {AndMatcher} from './matcher'

export class HttpInterceptorBuilder {
  match(matcher: IHttpMatcher) {
    this.matcher = new AndMatcher<Request>([matcher])
    return this
  }
  andMatch(matcher: IHttpMatcher) {
    this.matcher = this.matcher.and(matcher)
    return this
  }
  orMatch(matcher: IHttpMatcher) {
    this.matcher = this.matcher.or(matcher)
    return this
  }

  resolveWith(resolver: HttpInterceptorResolver) {
    this.resolver = resolver
    return this
  }

  buildInterceptor() {
    if (!this.resolver) {
      throw 'When the interceptor had been building, A response resolver was not set. You should use the withResponse method for example.'
    }
    return new HttpInterceptor(this.matcher, this.resolver)
  }

  private resolver?: HttpInterceptorResolver
  private matcher = new AndMatcher<Request>()
}
