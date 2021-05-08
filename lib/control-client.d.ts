import { IConfig } from './config';
import { HttpInterceptor } from './interceptor/http-interceptor';
export declare class ControlClient {
    private config;
    constructor(config: IConfig);
    queueHttpInterceptors: (...interceptors: HttpInterceptor[]) => Promise<void>;
}
