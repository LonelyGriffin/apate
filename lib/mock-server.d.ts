export interface IMockServer {
    run(): Promise<void>;
    shutdown(): Promise<void>;
}
export declare class MockServer implements IMockServer {
    private host;
    private port;
    constructor(host: string, port: number);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    private expressApp;
    private expressServer?;
}
