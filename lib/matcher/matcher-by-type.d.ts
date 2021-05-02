import { HttpMethodExactMatcher, HttpPathExactMatcher } from './http-matcher';
import { OrMatcher } from './logical-matcher';
import { MatcherType } from './matcher';
export declare const matcherByType: (type: MatcherType) => typeof HttpPathExactMatcher | typeof HttpMethodExactMatcher | typeof OrMatcher;
export declare type AnyMatcher = ReturnType<typeof matcherByType>;
