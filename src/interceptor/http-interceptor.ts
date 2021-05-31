import {Request, Response} from 'express'
import {deserializeAnyMatcher} from '../matcher/deserialize-any-matcher'
import {IMatcher} from '../matcher/matcher'
import {deserializeAnyResolver} from '../resolver/deserialize-any-resolver'
import {IHttpResolver} from '../resolver/http-resolver'
import {ISerializable, ISerialized} from '../serializable'
import {IInterceptor} from './interceptor'
export class HttpInterceptor implements IInterceptor, ISerializable {
  constructor(private matcher: IMatcher<any>, private resolver: IHttpResolver, public readonly scope?: string) {}

  get isResolved() {
    return this._isResolved
  }

  match(req: Request) {
    return this.matcher.match(req)
  }
  resolve(req: Request, res: Response) {
    this._isResolved = true
    return this.resolver.resolve(req, res)
  }

  serialize() {
    return {
      scope: this.scope,
      matcher: this.matcher.serialize(),
      resolver: this.resolver.serialize()
    }
  }

  static deserialize(serialized: ISerialized<HttpInterceptor>) {
    const matcher = deserializeAnyMatcher(serialized.matcher) as IMatcher<any>
    const resolver = deserializeAnyResolver(serialized.resolver)
    return new HttpInterceptor(matcher, resolver, serialized.scope)
  }

  private _isResolved = false
}
