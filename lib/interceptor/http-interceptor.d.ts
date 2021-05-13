import { Request, Response } from 'express';
import { IMatcher } from '../matcher/matcher';
import { HttpResolver } from '../resolver/http-resolver';
import { ISerializable, ISerialized } from '../serializable';
import { IInterceptor } from './interceptor';
export declare class HttpInterceptor implements IInterceptor, ISerializable {
    private matcher;
    private resolver;
    readonly scope?: string | undefined;
    constructor(matcher: IMatcher<Request>, resolver: HttpResolver, scope?: string | undefined);
    get isResolved(): boolean;
    match(req: Request): boolean;
    resolve(req: Request, res: Response): Response<any, Record<string, any>>;
    serialize(): {
        scope: string | undefined;
        matcher: any;
        resolver: {
            resolver: import("transferable-function").TransferableFunction;
            context: unknown;
            type: string;
        };
    };
    static deserialize(serialized: ISerialized<HttpInterceptor>): HttpInterceptor;
    private _isResolved;
}
