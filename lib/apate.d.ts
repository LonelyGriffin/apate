import { IConfig } from './config';
import { HttpInterceptorBuilder } from './interceptor/http-interceptor-builder';
export declare class Apate {
    constructor(config?: Partial<IConfig>);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    mockHttp(): HttpInterceptorBuilder;
    private config;
    private controlServer;
    private mockServer;
}
