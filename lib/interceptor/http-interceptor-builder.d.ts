import { HttpInterceptorResolver, HttpInterceptor } from './http-interceptor';
import { AnyHttpMather, AnyHttpMatherClass } from '../matcher/http-matcher';
declare type MatchArgs = [AnyHttpMather['type'], ...ConstructorParameters<AnyHttpMatherClass>] | [AnyHttpMather];
export declare class HttpInterceptorBuilder {
    match(...args: MatchArgs): this;
    andMatch(...args: MatchArgs): this;
    orMatch(...args: MatchArgs): this;
    resolveWith(resolver: HttpInterceptorResolver): this;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
    private matcher;
    private matchArgsToMatcher;
}
export {};
