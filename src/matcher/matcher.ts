export interface ILogicalMatcher<T> extends IMatcher<T> {
  or(matcher: IMatcher<T>): ILogicalMatcher<T>
  and(matcher: IMatcher<T>): ILogicalMatcher<T>
}

export interface IMatcher<T> {
  match(target: T): boolean
}

export abstract class LogicalMatcher<T> implements ILogicalMatcher<T> {
  constructor(protected matchers: Array<IMatcher<T>> = []) {}

  abstract match(target: T): boolean

  or(matcher: IMatcher<T>) {
    return new OrMatcher<T>([this, matcher])
  }

  and(matcher: IMatcher<T>) {
    return new AndMatcher<T>([this, matcher])
  }
}

export class OrMatcher<T> extends LogicalMatcher<T> {
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result || matcher.match(target), false)
  }
}

export class AndMatcher<T> extends LogicalMatcher<T> {
  match(target: T) {
    return this.matchers.reduce((result, matcher) => result && matcher.match(target), true)
  }
}
