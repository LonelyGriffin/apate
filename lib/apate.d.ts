import { IConfig } from './config';
import { ControlClient } from './control-client';
import { HttpInterceptor } from './interceptor/http-interceptor';
import { HttpInterceptorBuilder } from './interceptor/http-interceptor-builder';
export declare class Apate {
    client: ControlClient;
    constructor(config?: Partial<IConfig>);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    mockHttp(scope?: string): HttpInterceptorBuilder;
    startHttpProxy(): Promise<void>;
    stopHttpProxy(): Promise<void>;
    capturedHttpRequestsAsInterceptors(): Promise<HttpInterceptor[]>;
    private config;
    private controlServer;
    private mockServer;
}
