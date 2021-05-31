import { HttpInterceptor } from './http-interceptor';
import { Request, Response } from 'express';
import { HttpResolverConfig } from '../resolver/http-resolver';
import { HttpMatcherConfig } from '../matcher/http-matcher';
declare type MatchMethod = {
    <C = undefined>(matcher: (target: Request, context: C) => boolean, context: C): HttpInterceptorBuilder;
    (config: HttpMatcherConfig): HttpInterceptorBuilder;
};
declare type ResolveMethod = {
    <C>(resolve: (req: Request, res: Response, context: C) => Response, context: C): HttpInterceptorBuilder;
    (response: Partial<HttpResolverConfig>): HttpInterceptorBuilder;
};
export declare class HttpInterceptorBuilder {
    private commitHandler;
    private scope?;
    constructor(commitHandler?: (interceptor: HttpInterceptor) => Promise<void>, scope?: string | undefined);
    commit(): Promise<HttpInterceptor>;
    match: MatchMethod;
    andMatch: MatchMethod;
    orMatch: MatchMethod;
    resolve: ResolveMethod;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
    private matcher;
    private matchArgsToMatcher;
    private matchArgsToResolver;
}
export {};
