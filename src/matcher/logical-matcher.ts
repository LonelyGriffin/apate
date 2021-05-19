import {deserializeFn} from 'transferable-function'
import {ISerialized, ISerializable} from '../serializable'
import {BaseMatcher, IMatcher} from './matcher'

export abstract class LogicalMatcher<T> implements IMatcher<T, undefined>, ISerializable {
  constructor(protected matchers: Array<IMatcher<T, any>> = []) {}

  abstract readonly type: string
  readonly context: undefined
  abstract match(target: T): boolean

  or(matcher: IMatcher<T, any>) {
    return new OrMatcher<T>([this, matcher])
  }

  and(matcher: IMatcher<T, any>) {
    return new AndMatcher<T>([this, matcher])
  }

  serialize() {
    return {
      type: this.type,
      matchers: this.matchers.map((matcher) => matcher.serialize()) as Array<ISerialized<BaseMatcher<any, any>>>
    }
  }
}

export class OrMatcher<T> extends LogicalMatcher<T> {
  readonly type = 'or'
  readonly context = undefined
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result || matcher.match(target), false)
  }

  static deserialize<T>(serialized: ISerialized<OrMatcher<T>>) {
    const matchers = serialized.matchers.map(
      (matcherData) => new BaseMatcher(matcherData.type, deserializeFn(matcherData.matcher) as any, matcherData.context)
    )
    return new OrMatcher<T>(matchers)
  }
}

export class AndMatcher<T> extends LogicalMatcher<T> {
  readonly type = 'and'
  readonly context = undefined
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result && matcher.match(target), true)
  }

  static deserialize<T>(serialized: ISerialized<AndMatcher<T>>) {
    const matchers = serialized.matchers.map(
      (matcherData) => new BaseMatcher(matcherData.type, deserializeFn(matcherData.matcher) as any, matcherData.context)
    )
    return new AndMatcher<T>(matchers)
  }
}
