import { IInterceptor } from './interceptor';
export interface IMockServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptor(interceptor: IInterceptor): void;
}
export declare class MockServer implements IMockServer {
    private host;
    private port;
    constructor(host: string, port: number);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptor(interceptor: IInterceptor): void;
    private expressApp;
    private expressServer?;
    private interceptorsQueue;
    private allRoutesHandler;
}
