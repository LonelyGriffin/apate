import { Request } from 'express';
import { IMatcher } from './matcher';
export declare class HttpPathExactMatcher implements IMatcher<Request> {
    private expected;
    readonly type = "path-exact";
    constructor(expected: string);
    match(req: Request): boolean;
    serialize(): {
        type: string;
        expected: string;
    };
    static deserialize(serialized: ISerialized<HttpMethodExactMatcher>): HttpMethodExactMatcher;
}
export declare class HttpMethodExactMatcher implements IMatcher<Request> {
    private expected;
    readonly type = "method-exact";
    constructor(expected: string);
    match(req: Request): boolean;
    serialize(): {
        type: string;
        expected: string;
    };
    static deserialize(serialized: ISerialized<HttpMethodExactMatcher>): HttpMethodExactMatcher;
}
export declare type AnyHttpMather = HttpPathExactMatcher | HttpMethodExactMatcher;
export declare type AnyHttpMatherClass = typeof HttpPathExactMatcher | typeof HttpMethodExactMatcher;
