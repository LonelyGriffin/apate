import {Request, Response} from 'express'
import {IInterceptor} from './interceptor'

export interface IHttpMatchConfig {
  url?: string
  method?: string
  headers?: Record<string, string>
  body?: string
}

export type HttpInterceptorResolver = (req: Request, res: Response) => Response
export class HttpInterceptor implements IInterceptor {
  constructor(private matchConfig: IHttpMatchConfig, private resolver: HttpInterceptorResolver) {}

  get isResolved() {
    return this._isResolved
  }

  match(req: Request) {
    return true
  }
  resolve(req: Request, res: Response) {
    this._isResolved = true
    return this.resolver(req, res)
  }

  private _isResolved = false
}
