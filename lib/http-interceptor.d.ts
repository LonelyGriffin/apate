import { Request, Response } from 'express';
import { IInterceptor } from './interceptor';
export interface IHttpMatchConfig {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}
export declare type HttpInterceptorResolver = (req: Request, res: Response) => Response;
export declare class HttpInterceptor implements IInterceptor {
    private matchConfig;
    private resolver;
    constructor(matchConfig: IHttpMatchConfig, resolver: HttpInterceptorResolver);
    get isResolved(): boolean;
    match(req: Request): boolean;
    resolve(req: Request, res: Response): Response<any, Record<string, any>>;
    private _isResolved;
}
