import {ISerialized} from '../serializable'
import {HttpMatcher} from './http-matcher'
import {AndMatcher, OrMatcher} from './logical-matcher'
import {CustomMatcher, IMatcher} from './matcher'

export const deserializeAnyMatcher = (serialized: ISerialized<IMatcher<any>>): IMatcher<any> => {
  switch (serialized.type) {
    case 'custom-matcher':
      return CustomMatcher.deserialize(serialized as ISerialized<CustomMatcher<any, any>>)
    case 'or-matcher':
      return OrMatcher.deserialize(serialized as ISerialized<OrMatcher<any>>)
    case 'and-matcher':
      return AndMatcher.deserialize(serialized as ISerialized<AndMatcher<any>>)
    case 'http-matcher':
      return HttpMatcher.deserialize(serialized as ISerialized<HttpMatcher>)
    default:
      throw new Error('unknown matcher')
  }
}
