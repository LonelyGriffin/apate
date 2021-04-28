import { IConfig } from './config';
export interface IApate {
    run(): Promise<void>;
    shutdown(): Promise<void>;
}
export declare class Apate implements IApate {
    constructor(config?: Partial<IConfig>);
    run(): Promise<void>;
    shutdown(): Promise<void>;
    private config;
    private controlServer;
}
