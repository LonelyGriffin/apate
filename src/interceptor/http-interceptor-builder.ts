import {HttpInterceptor} from './http-interceptor'
import {Request} from 'express'
import {AndMatcher, LogicalMatcher} from '../matcher/logical-matcher'
import {CustomMatcher, IMatcher} from '../matcher/matcher'
import {HttpResolver} from '../resolver/http-resolver'
import {HttpMatcher, HttpMatcherConfig} from '../matcher/http-matcher'

type MatchMethod = {
  <C = undefined>(matcher: (target: Request, context: C) => boolean, context: C): HttpInterceptorBuilder
  (config: HttpMatcherConfig): HttpInterceptorBuilder
}

export class HttpInterceptorBuilder {
  constructor(private commitHandler = async (interceptor: HttpInterceptor) => {}, private scope?: string) {}

  async commit() {
    const interceptor = this.buildInterceptor()

    await this.commitHandler(interceptor)

    return interceptor
  }

  match: MatchMethod = (...args: any) => {
    this.matcher = new AndMatcher<Request>([this.matchArgsToMatcher(args)])
    return this
  }
  andMatch: MatchMethod = (...args: any) => {
    this.matcher = this.matcher.and(this.matchArgsToMatcher(args))
    return this
  }
  orMatch: MatchMethod = (...args: any) => {
    this.matcher = this.matcher.or(this.matchArgsToMatcher(args))
    return this
  }

  resolveWith(...params: ConstructorParameters<typeof HttpResolver>) {
    this.resolver = new HttpResolver(...params)
    return this
  }

  buildInterceptor() {
    if (!this.resolver) {
      throw 'When the interceptor had been building, A response resolver was not set. You should use the withResponse method for example.'
    }
    return new HttpInterceptor(this.matcher, this.resolver, this.scope)
  }

  private resolver?: HttpResolver
  private matcher: LogicalMatcher<Request> = new AndMatcher<Request>()

  private matchArgsToMatcher = (args: any): IMatcher<Request> => {
    if (typeof args[0] === 'function') {
      return new CustomMatcher(args[0], args[1])
    } else {
      return new HttpMatcher(args[0])
    }
  }
}
