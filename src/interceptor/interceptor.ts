import {Request, Response} from 'express'

export interface IInterceptor {
  scope?: string
  isResolved: boolean
  match(req: Request): boolean
  resolve(req: Request, resp: Response): Response
}
