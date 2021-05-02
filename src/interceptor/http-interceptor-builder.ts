import {HttpInterceptorResolver, HttpInterceptor} from './http-interceptor'
import {Request} from 'express'
import {AnyHttpMather, AnyHttpMatherClass} from '../matcher/http-matcher'
import {AndMatcher} from '../matcher/logical-matcher'
import {IMatcher} from '../matcher/matcher'
import {matcherByType} from '../matcher/matcher-by-type'

type MatchArgs = [AnyHttpMather['type'], ...ConstructorParameters<AnyHttpMatherClass>] | [AnyHttpMather]

export class HttpInterceptorBuilder {
  match(...args: MatchArgs) {
    this.matcher = new AndMatcher<Request>([this.matchArgsToMatcher(args)])
    return this
  }
  andMatch(...args: MatchArgs) {
    this.matcher = this.matcher.and(this.matchArgsToMatcher(args))
    return this
  }
  orMatch(...args: MatchArgs) {
    this.matcher = this.matcher.or(this.matchArgsToMatcher(args))
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

  private matchArgsToMatcher = (args: MatchArgs): IMatcher<Request> => {
    if (typeof args[0] === 'string') {
      const MatcherClass = matcherByType(args[0]) as any
      return new MatcherClass(...args.slice(1))
    }

    return args[0]
  }
}
