import {matcherByType} from './matcher-by-type'

export const deserializeAnyMatcher = (serializedMatcher: any) => {
  const Matcher = matcherByType(serializedMatcher.type) as any
  return Matcher.deserialize(serializedMatcher)
}
