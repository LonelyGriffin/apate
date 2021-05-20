import {deserializeFn, serializeFn} from 'transferable-function'
import {ISerializable, ISerialized} from '../serializable'

export type MatcherType = 'custom-matcher' | 'or-matcher' | 'and-matcher' | 'http-matcher'

export interface IMatcher<T> extends ISerializable {
  readonly type: MatcherType
  match(target: T): boolean
  serialize(): {type: MatcherType}
}

export class CustomMatcher<T, C = unknown> implements IMatcher<T> {
  readonly type: MatcherType = 'custom-matcher'
  constructor(private matcher: (target: T, context: C) => boolean, readonly context: C) {}
  match(target: T) {
    return this.matcher(target, this.context)
  }
  serialize() {
    return {
      type: this.type,
      matcher: serializeFn(this.matcher),
      context: this.context
    }
  }
  static deserialize<T, C = unknown>(serialized: ISerialized<CustomMatcher<T, C>>) {
    const matcher = deserializeFn(serialized.matcher) as (target: T, context: C) => boolean
    return new CustomMatcher(matcher, serialized.context)
  }
}
