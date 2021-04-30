import { Request, Response } from 'express';
import { IHttpMatcher } from './http-matcher';
import { IInterceptor } from './interceptor';
export declare type HttpInterceptorResolver = (req: Request, res: Response) => Response;
export declare class HttpInterceptor implements IInterceptor {
    private matcher;
    private resolver;
    constructor(matcher: IHttpMatcher, resolver: HttpInterceptorResolver);
    get isResolved(): boolean;
    match(req: Request): boolean;
    resolve(req: Request, res: Response): Response<any, Record<string, any>>;
    private _isResolved;
}
