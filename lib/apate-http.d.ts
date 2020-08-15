export declare type ApateHttpConfig = {
    mockHost: string;
    mockPort: number;
    controlHost: string;
    controlPort: number;
};
export declare class ApateHttp {
    constructor(config: Partial<ApateHttpConfig>);
    startMock(): Promise<void>;
    startControl(): Promise<void>;
    start(): Promise<void>;
    stopMock(): Promise<void>;
    stopControl(): Promise<void>;
    stop(): Promise<void>;
    private config;
}
