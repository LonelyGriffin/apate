import { Request } from 'express';
import { IHttpMatchConfig, IHttpMatcher } from './http-matcher';
export declare class StrictHttpMatcher implements IHttpMatcher {
    matchWithRequest(matchConfig: IHttpMatchConfig, req: Request): boolean;
}
