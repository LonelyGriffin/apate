import { Request, Response } from 'express';
import { IMatcher } from '../matcher/matcher';
import { IHttpResolver } from '../resolver/http-resolver';
import { ISerializable, ISerialized } from '../serializable';
import { IInterceptor } from './interceptor';
export declare class HttpInterceptor implements IInterceptor, ISerializable {
    private matcher;
    private resolver;
    readonly scope?: string | undefined;
    constructor(matcher: IMatcher<any>, resolver: IHttpResolver, scope?: string | undefined);
    get isResolved(): boolean;
    match(req: Request): boolean;
    resolve(req: Request, res: Response): Response<any, Record<string, any>>;
    serialize(): {
        scope: string | undefined;
        matcher: {
            type: import("../matcher/matcher").MatcherType;
        };
        resolver: {
            type: import("../resolver/http-resolver").HttpResolverType;
        };
    };
    static deserialize(serialized: ISerialized<HttpInterceptor>): HttpInterceptor;
    private _isResolved;
}
