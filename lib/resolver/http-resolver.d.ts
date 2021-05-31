import { Request, Response } from 'express';
import { ISerializable, ISerialized } from '../serializable';
export declare type HttpResolverType = 'custom' | 'static';
export interface IHttpResolver extends ISerializable {
    readonly type: HttpResolverType;
    resolve(req: Request, res: Response): Response;
    serialize(): {
        type: HttpResolverType;
    };
}
export declare type HttpResolverConfig = {
    body: string;
    statusCode: number;
    statusMessage: string;
};
export declare class HttpResolver implements IHttpResolver {
    readonly type: HttpResolverType;
    constructor(config: Partial<HttpResolverConfig>);
    resolve(req: Request, res: Response): Response;
    serialize(): {
        type: HttpResolverType;
        config: HttpResolverConfig;
    };
    static deserialize<C>(serialized: ISerialized<HttpResolver>): HttpResolver;
    private config;
}
export declare class HttpCustomResolver<C> implements IHttpResolver {
    private resolver;
    private context;
    readonly type: HttpResolverType;
    constructor(resolver: (req: Request, res: Response, context: C) => Response, context: C);
    resolve(req: Request, res: Response): Response;
    serialize(): {
        resolver: import("transferable-function").TransferableFunction;
        context: C;
        type: HttpResolverType;
    };
    static deserialize<C>(serialized: ISerialized<HttpCustomResolver<C>>): HttpCustomResolver<C>;
}
