import {HttpMethodExactMatcher, HttpPathExactMatcher} from './http-matcher'
import {AndMatcher, OrMatcher} from './logical-matcher'
import {MatcherType} from './matcher'

export const matcherByType = (type: MatcherType) => {
  switch (type) {
    case 'or':
      return OrMatcher
    case 'and':
      return AndMatcher
    case 'method-exact':
      return HttpMethodExactMatcher
    case 'path-exact':
      return HttpPathExactMatcher
  }
}

export type AnyMatcher = ReturnType<typeof matcherByType>
