import { HttpMethodExactMatcher, HttpPathExactMatcher } from './http-matcher';
import { OrMatcher } from './logical-matcher';
import { CustomMatcher, MatcherType } from './matcher';
export declare const matcherByType: (type: MatcherType) => typeof CustomMatcher | typeof OrMatcher | typeof HttpPathExactMatcher | typeof HttpMethodExactMatcher;
export declare type AnyMatcher = ReturnType<typeof matcherByType>;
