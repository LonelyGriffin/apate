import {serializeFn, deserializeFn} from 'transferable-function'
import {ISerializable, ISerialized} from '../serializable'

export interface IMatcher<T, C = any> extends ISerializable {
  readonly type: string
  readonly context: C
  match(target: T): boolean
}

export class BaseMatcher<T, C = any> implements IMatcher<T, C> {
  constructor(readonly type: string, private matcher: (target: T, context: C) => boolean, readonly context: C) {}
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
  static deserialize<T, C = unknown>(serialized: ISerialized<BaseMatcher<T, C>>) {
    const matcher = deserializeFn(serialized.matcher) as (target: T, context: C) => boolean
    return new BaseMatcher(serialized.type, matcher, serialized.context)
  }
}
