import { HttpInterceptorBuilder } from './interceptor/http-interceptor-builder';
import { HttpInterceptor } from './interceptor/http-interceptor';
export declare class HttpMocker extends HttpInterceptorBuilder {
    private commitHandler;
    constructor(commitHandler?: (interceptor: HttpInterceptor) => void);
    commit(): HttpInterceptor;
}
