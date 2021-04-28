export interface IControlServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
}
export declare class ControlServer implements IControlServer {
    private host;
    private port;
    constructor(host: string, port: number);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    private expressApp;
    private expressServer?;
}
