import {Request, Response} from 'express'
import {deserializeFn, serializeFn} from 'transferable-function'
import {ISerializable, ISerialized} from '../serializable'

export type HttpResolverType = 'custom' | 'static'
export interface IHttpResolver extends ISerializable {
  readonly type: HttpResolverType
  resolve(req: Request, res: Response): Response
  serialize(): {type: HttpResolverType}
}

export type HttpResolverConfig = {
  body: string
  statusCode: number
  statusMessage: string
}

const DEFAULT_CONFIG: HttpResolverConfig = {
  body: '',
  statusCode: 200,
  statusMessage: 'OK'
}

export class HttpResolver implements IHttpResolver {
  readonly type: HttpResolverType = 'static'
  constructor(config: Partial<HttpResolverConfig>) {
    this.config = {...DEFAULT_CONFIG, ...config}
  }
  resolve(req: Request, res: Response): Response {
    res.status(this.config.statusCode)
    res.send(this.config.body)

    return res
  }

  serialize() {
    return {
      type: this.type,
      config: this.config
    }
  }

  static deserialize<C>(serialized: ISerialized<HttpResolver>) {
    return new HttpResolver(serialized.config)
  }

  private config: HttpResolverConfig
}
export class HttpCustomResolver<C> implements IHttpResolver {
  readonly type: HttpResolverType = 'custom'
  constructor(private resolver: (req: Request, res: Response, context: C) => Response, private context: C) {}
  resolve(req: Request, res: Response): Response {
    return this.resolver(req, res, this.context)
  }

  serialize() {
    const resolver = serializeFn(this.resolver)
    return {
      resolver,
      context: this.context,
      type: this.type
    }
  }

  static deserialize<C>(serialized: ISerialized<HttpCustomResolver<C>>) {
    return new HttpCustomResolver(deserializeFn(serialized.resolver) as any, serialized.context)
  }
}
