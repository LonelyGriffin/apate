import {ISerialized, ISerializable} from '../serializable'
import {deserializeAnyMatcher} from './deserialize-any-matcher'
import {IMatcher, MatcherType} from './matcher'

export abstract class LogicalMatcher<T> implements IMatcher<T>, ISerializable {
  constructor(protected matchers: Array<IMatcher<T>> = []) {}

  abstract readonly type: MatcherType
  abstract match(target: T): boolean

  or(matcher: IMatcher<T>) {
    return new OrMatcher<T>([this, matcher])
  }

  and(matcher: IMatcher<T>) {
    return new AndMatcher<T>([this, matcher])
  }

  serialize() {
    return {
      type: this.type,
      matchers: this.matchers.map((matcher) => matcher.serialize()) as Array<IMatcher<T>>
    }
  }
}

export class OrMatcher<T> extends LogicalMatcher<T> {
  readonly type: MatcherType = 'or-matcher'
  readonly context = undefined
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result || matcher.match(target), false)
  }

  static deserialize<T>(serialized: ISerialized<OrMatcher<T>>) {
    const matchers = serialized.matchers.map((serializedMatcher) => deserializeAnyMatcher(serializedMatcher))
    return new OrMatcher<T>(matchers)
  }
}

export class AndMatcher<T> extends LogicalMatcher<T> {
  readonly type: MatcherType = 'and-matcher'
  readonly context = undefined
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result && matcher.match(target), true)
  }

  static deserialize<T>(serialized: ISerialized<AndMatcher<T>>) {
    const matchers = serialized.matchers.map((serializedMatcher) => deserializeAnyMatcher(serializedMatcher))
    return new AndMatcher<T>(matchers)
  }
}
