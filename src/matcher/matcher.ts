export type MatcherType = 'or' | 'and' | 'path-exact' | 'method-exact'

export interface IMatcher<T> extends ISerializable {
  readonly type: MatcherType
  match(target: T): boolean
}
