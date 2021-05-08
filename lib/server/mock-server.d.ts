import { IInterceptor } from '../interceptor/interceptor';
export interface IMockServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptors(...interceptor: IInterceptor[]): void;
}
export declare class MockServer implements IMockServer {
    private host;
    private port;
    constructor(host: string, port: number);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    queueInterceptors(...interceptors: IInterceptor[]): void;
    private expressApp;
    private expressServer?;
    private interceptorsQueue;
    private allRoutesHandler;
}
