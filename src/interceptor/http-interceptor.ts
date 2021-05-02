import {Request, Response} from 'express'
import {IMatcher} from '../matcher/matcher'
import {IInterceptor} from './interceptor'

export type HttpInterceptorResolver = (req: Request, res: Response) => Response
export class HttpInterceptor implements IInterceptor {
  constructor(private matcher: IMatcher<Request>, private resolver: HttpInterceptorResolver) {}

  get isResolved() {
    return this._isResolved
  }

  match(req: Request) {
    return this.matcher.match(req)
  }
  resolve(req: Request, res: Response) {
    this._isResolved = true
    return this.resolver(req, res)
  }

  private _isResolved = false
}
