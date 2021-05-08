import { Request, Response } from 'express';
import { ISerializable, ISerialized } from '../serializable';
export declare class HttpResolver<C = unknown> implements ISerializable {
    private resolver;
    private context;
    constructor(resolver: (req: Request, res: Response, context: C) => Response, context: C);
    resolve(req: Request, res: Response): Response;
    serialize(): {
        resolver: import("transferable-function").TransferableFunction;
        context: C;
    };
    static deserialize<C>(serialized: ISerialized<HttpResolver<C>>): HttpResolver<C>;
}
