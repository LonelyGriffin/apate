export interface IConfig {
    readonly controlHost: string;
    readonly controlPort: number;
    readonly mockProtocol: 'http';
    readonly mockHost: string;
    readonly mockPort: number;
}
export declare const DEFAULT_CONFIG: IConfig;
