export interface IConfig {
    readonly controlHost: string;
    readonly controlPort: number;
    readonly mockHost: string;
    readonly mockPort: number;
    readonly originalHost: string;
    readonly originalPort: number;
}
export declare const DEFAULT_CONFIG: IConfig;
