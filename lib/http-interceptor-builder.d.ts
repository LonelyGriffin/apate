import { HttpInterceptorResolver, IHttpMatchConfig, HttpInterceptor } from './http-interceptor';
export declare class HttpInterceptorBuilder {
    private matchConfig;
    constructor(matchConfig?: IHttpMatchConfig);
    withUrl(url: string): this;
    withMethod(method: string): this;
    withBody(body: string): this;
    withHeader(name: string, value: string): this;
    withResponse(resolver: HttpInterceptorResolver): this;
    buildInterceptor(): HttpInterceptor;
    private resolver?;
}
