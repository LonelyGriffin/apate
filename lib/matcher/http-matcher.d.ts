import { Request } from 'express';
import { ISerialized } from '../serializable';
import { CustomMatcher, IMatcher, MatcherType } from './matcher';
export declare type HttpMatcherConfig = {
    'path-exact'?: string;
    'method-exact'?: string;
};
export declare class HttpMatcher implements IMatcher<Request> {
    private config;
    readonly type: MatcherType;
    constructor(config: HttpMatcherConfig);
    match(req: Request): boolean;
    serialize(): {
        type: MatcherType;
        config: HttpMatcherConfig;
    };
    static deserialize(serialized: ISerialized<HttpMatcher>): HttpMatcher;
    private matchByProp;
    private matchByPathExactly;
    private matchByMethodExactly;
}
export declare type CustomHttpMatcher<C> = CustomMatcher<Request, C>;
export declare type AnyHttpMather = CustomHttpMatcher<any> | HttpMatcher;
