import { Request, Response } from 'express';
import { IInterceptor } from '../interceptor/interceptor';
export interface IMockServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptors(...interceptor: IInterceptor[]): void;
    enableProxy(): void;
    disableProxy(): void;
    getCapturedProxyInterceptors(): Readonly<IInterceptor[]>;
}
export declare class MockServer implements IMockServer {
    private host;
    private port;
    private proxyHost;
    private proxyPort;
    constructor(host: string, port: number, proxyHost: string, proxyPort: number);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptors(...interceptors: IInterceptor[]): void;
    enableProxy(): void;
    disableProxy(): void;
    getCapturedProxyInterceptors(): Readonly<IInterceptor[]>;
    private expressApp;
    private expressServer?;
    private interceptorsQueue;
    private proxyEnabled;
    private capturedProxyInterceptors;
    private allRoutesHandler;
    makeProxy(origReq: Request, origRes: Response): void;
}
