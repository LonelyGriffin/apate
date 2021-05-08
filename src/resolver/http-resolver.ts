import {Request, Response} from 'express'
import {deserializeFn, serializeFn} from 'transferable-function'
import {ISerializable, ISerialized} from '../serializable'

export class HttpResolver<C = unknown> implements ISerializable {
  constructor(private resolver: (req: Request, res: Response, context: C) => Response, private context: C) {}
  resolve(req: Request, res: Response): Response {
    return this.resolver(req, res, this.context)
  }

  serialize() {
    const resolver = serializeFn(this.resolver)
    return {
      resolver,
      context: this.context
    }
  }

  static deserialize<C>(serialized: ISerialized<HttpResolver<C>>) {
    return new HttpResolver(deserializeFn(serialized.resolver) as any, serialized.context)
  }
}
