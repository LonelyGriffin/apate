import { IConfig } from './config';
import { HttpMocker } from './http-mocker';
export declare class Apate {
    constructor(config?: Partial<IConfig>);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    mockHttp(): HttpMocker;
    private config;
    private controlServer;
    private mockServer;
}
