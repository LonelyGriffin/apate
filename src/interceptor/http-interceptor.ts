import {Request, Response} from 'express'
import {deserializeAnyMatcher} from '../matcher/deserialize-any-matcher'
import {IMatcher} from '../matcher/matcher'
import {HttpResolver} from '../resolver/http-resolver'
import {ISerializable, ISerialized} from '../serializable'
import {IInterceptor} from './interceptor'
export class HttpInterceptor implements IInterceptor, ISerializable {
  constructor(private matcher: IMatcher<Request>, private resolver: HttpResolver) {}

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
      matcher: this.matcher.serialize() as any,
      resolver: this.resolver.serialize()
    }
  }

  static deserialize(serialized: ISerialized<HttpInterceptor>) {
    const matcher = deserializeAnyMatcher(serialized.matcher) as IMatcher<Request>
    const resolver = HttpResolver.deserialize(serialized.resolver)
    return new HttpInterceptor(matcher, resolver)
  }

  private _isResolved = false
}
