import {serializeFn, deserializeFn} from 'transferable-function'

export type MatcherType = 'custom' | 'or' | 'and' | 'path-exact' | 'method-exact'

export interface IMatcher<T> extends ISerializable {
  readonly type: MatcherType
  match(target: T): boolean
}

export class CustomMatcher<T, C = any> implements IMatcher<T> {
  readonly type: MatcherType = 'custom'
  constructor(private matcher: (target: T, context: C) => boolean, private context: C) {}
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
