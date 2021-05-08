import {ISerialized, ISerializable} from '../serializable'
import {deserializeAnyMatcher} from './deserialize-any-matcher'
import {IMatcher, MatcherType} from './matcher'

export interface ILogicalMatcher<T> extends IMatcher<T> {
  or(matcher: IMatcher<T>): ILogicalMatcher<T>
  and(matcher: IMatcher<T>): ILogicalMatcher<T>
}

export abstract class LogicalMatcher<T> implements ILogicalMatcher<T>, ISerializable {
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
      matchers: this.matchers.map((matcher) => matcher.serialize())
    }
  }
}

export class OrMatcher<T> extends LogicalMatcher<T> {
  readonly type: MatcherType = 'or'
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result || matcher.match(target), false)
  }

  static deserialize<T>(serialized: ISerialized<OrMatcher<T>>) {
    const matchers = serialized.matchers.map(deserializeAnyMatcher) as Array<IMatcher<T>>
    return new OrMatcher<T>(matchers)
  }
}

export class AndMatcher<T> extends LogicalMatcher<T> {
  readonly type: MatcherType = 'and'
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result && matcher.match(target), true)
  }

  static deserialize<T>(serialized: ISerialized<AndMatcher<T>>) {
    const matchers = serialized.matchers.map(deserializeAnyMatcher) as Array<IMatcher<T>>
    return new AndMatcher<T>(matchers)
  }
}
