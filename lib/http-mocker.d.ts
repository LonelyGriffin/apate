import { HttpInterceptorBuilder } from './http-interceptor-builder';
import { HttpInterceptor } from './http-interceptor';
export declare class HttpMocker extends HttpInterceptorBuilder {
    private commitHandler;
    constructor(commitHandler?: (interceptor: HttpInterceptor) => void);
    commit(): HttpInterceptor;
}
