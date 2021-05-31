import {ISerialized} from '../serializable'
import {HttpCustomResolver, IHttpResolver, HttpResolver} from './http-resolver'

export const deserializeAnyResolver = (serialized: ISerialized<IHttpResolver>): IHttpResolver => {
  switch (serialized.type) {
    case 'custom':
      return HttpCustomResolver.deserialize(serialized as ISerialized<HttpCustomResolver<any>>)
    case 'static':
      return HttpResolver.deserialize(serialized as ISerialized<HttpResolver>)
    default:
      throw new Error('unknown resolver')
  }
}
