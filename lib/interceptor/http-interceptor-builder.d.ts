import { HttpInterceptorResolver, HttpInterceptor } from './http-interceptor';
import { Request } from 'express';
declare type MatchMethod = {
    <C>(type: 'custom', matcher: (target: Request, context: C) => boolean, context: C): HttpInterceptorBuilder;
    (type: 'path-exact', path: string): HttpInterceptorBuilder;
    (type: 'method-exact', path: string): HttpInterceptorBuilder;
};
export declare class HttpInterceptorBuilder {
    private commitHandler;
    constructor(commitHandler?: (interceptor: HttpInterceptor) => void);
    commit(): HttpInterceptor;
    match: MatchMethod;
    andMatch: MatchMethod;
    orMatch: MatchMethod;
    resolveWith(resolver: HttpInterceptorResolver): this;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
    private matcher;
    private matchArgsToMatcher;
}
export {};
