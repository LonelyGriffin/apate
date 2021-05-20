import { HttpInterceptor } from './http-interceptor';
import { Request } from 'express';
import { HttpResolver } from '../resolver/http-resolver';
import { HttpMatcherConfig } from '../matcher/http-matcher';
declare type MatchMethod = {
    <C = undefined>(matcher: (target: Request, context: C) => boolean, context: C): HttpInterceptorBuilder;
    (config: HttpMatcherConfig): HttpInterceptorBuilder;
};
export declare class HttpInterceptorBuilder {
    private commitHandler;
    private scope?;
    constructor(commitHandler?: (interceptor: HttpInterceptor) => Promise<void>, scope?: string | undefined);
    commit(): Promise<HttpInterceptor>;
    match: MatchMethod;
    andMatch: MatchMethod;
    orMatch: MatchMethod;
    resolveWith(...params: ConstructorParameters<typeof HttpResolver>): this;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
    private matcher;
    private matchArgsToMatcher;
}
export {};
