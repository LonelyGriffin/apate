import {Request, Response} from 'express'
import {BaseMatcher, IMatcher} from '../matcher/matcher'
import {HttpResolver} from '../resolver/http-resolver'
import {ISerializable, ISerialized} from '../serializable'
import {IInterceptor} from './interceptor'
export class HttpInterceptor implements IInterceptor, ISerializable {
  constructor(private matcher: IMatcher<Request>, private resolver: HttpResolver, public readonly scope?: string) {}

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
      matcher: this.matcher.serialize() as ISerialized<BaseMatcher<Request, any>>,
      resolver: this.resolver.serialize()
    }
  }

  static deserialize(serialized: ISerialized<HttpInterceptor>) {
    const matcher = new BaseMatcher(
      serialized.matcher.type,
      serialized.matcher.matcher as any,
      serialized.matcher.context
    )
    const resolver = HttpResolver.deserialize(serialized.resolver)
    return new HttpInterceptor(matcher, resolver, serialized.scope)
  }

  private _isResolved = false
}
