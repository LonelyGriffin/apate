import { Request, Response } from 'express';
import { ISerializable, ISerialized } from '../serializable';
export declare class HttpResolver<C = unknown> implements ISerializable {
    private resolver;
    private context;
    private type;
    constructor(resolver: (req: Request, res: Response, context: C) => Response, context: C, type?: string);
    resolve(req: Request, res: Response): Response;
    serialize(): {
        resolver: import("transferable-function").TransferableFunction;
        context: C;
        type: string;
    };
    static deserialize<C>(serialized: ISerialized<HttpResolver<C>>): HttpResolver<C>;
}
export declare class HttpResolverWithBody<C> extends HttpResolver<C> {
    constructor(body: C);
}
