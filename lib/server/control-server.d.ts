import { IMockServer } from './mock-server';
export interface IControlServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
}
export declare class ControlServer implements IControlServer {
    private host;
    private port;
    private mockServer;
    constructor(host: string, port: number, mockServer: IMockServer);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    private expressApp;
    private expressServer?;
    private handlePostHttpInterceptor;
    private handlePostProxyEnable;
    private handlePostProxyDisable;
    private getCapturedProxyInterceptors;
}
