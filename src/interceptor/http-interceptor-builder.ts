import {HttpInterceptor} from './http-interceptor'
import {Request} from 'express'
import {AndMatcher} from '../matcher/logical-matcher'
import {IMatcher} from '../matcher/matcher'
import {matcherByType} from '../matcher/matcher-by-type'
import {HttpResolver} from '../resolver/http-resolver'

type MatchMethod = {
  <C>(type: 'custom', matcher: (target: Request, context: C) => boolean, context: C): HttpInterceptorBuilder
  (type: 'path-exact', path: string): HttpInterceptorBuilder
  (type: 'method-exact', path: string): HttpInterceptorBuilder
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
  private matcher = new AndMatcher<Request>()

  private matchArgsToMatcher = (args: any): IMatcher<Request> => {
    if (typeof args[0] === 'string') {
      const MatcherClass = matcherByType(args[0] as any) as any
      return new MatcherClass(...args.slice(1))
    }

    return args[0]
  }
}
