import { Request } from 'express';
import { IMatcher } from './matcher';
export interface IHttpMatcher extends IMatcher<Request> {
}
export declare class HttpPathExactMatcher implements IHttpMatcher {
    private expected;
    constructor(expected: string);
    match(req: Request): boolean;
}
export declare class HttpMethodExactMatcher implements IHttpMatcher, ISerializable {
    private expected;
    constructor(expected: string);
    match(req: Request): boolean;
    serialize(): {
        name: string;
        expected: string;
    };
    static deserialize(serializeObject: SerializeObjectType<HttpMethodExactMatcher>): HttpMethodExactMatcher;
}
interface ISerializable<T = unknown> {
    serialize(): T;
}
declare type SerializeObjectType<T extends ISerializable> = ReturnType<T['serialize']>;
export {};
