import { HttpInterceptorResolver, HttpInterceptor } from './http-interceptor';
import { IHttpMatcher } from '../matcher/http-matcher';
export declare class HttpInterceptorBuilder {
    match(matcher: IHttpMatcher): this;
    andMatch(matcher: IHttpMatcher): this;
    orMatch(matcher: IHttpMatcher): this;
    resolveWith(resolver: HttpInterceptorResolver): this;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
    private matcher;
}
