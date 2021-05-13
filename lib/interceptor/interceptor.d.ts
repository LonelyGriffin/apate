import { Request, Response } from 'express';
import { ISerializable } from '../serializable';
export interface IInterceptor extends ISerializable {
    scope?: string;
    isResolved: boolean;
    match(req: Request): boolean;
    resolve(req: Request, resp: Response): Response;
}
