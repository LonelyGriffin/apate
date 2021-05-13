import {Request, Response} from 'express'
import {deserializeFn, serializeFn} from 'transferable-function'
import {ISerializable, ISerialized} from '../serializable'

export class HttpResolver<C = unknown> implements ISerializable {
  constructor(
    private resolver: (req: Request, res: Response, context: C) => Response,
    private context: C,
    private type: string = 'custom'
  ) {}
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

  static deserialize<C>(serialized: ISerialized<HttpResolver<C>>) {
    return new HttpResolver(deserializeFn(serialized.resolver) as any, serialized.context, serialized.type)
  }
}

export class HttpResolverWithBody<C> extends HttpResolver<C> {
  constructor(body: C) {
    super((_, res, body) => res.send(body), body, 'with-body')
  }
}
