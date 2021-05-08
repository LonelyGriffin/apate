import { Request } from 'express';
import { ISerializable, ISerialized } from '../serializable';
import { IMatcher } from './matcher';
export declare class HttpPathExactMatcher implements IMatcher<Request>, ISerializable {
    private expected;
    readonly type = "path-exact";
    constructor(expected: string);
    match(req: Request): boolean;
    serialize(): {
        type: string;
        expected: string;
    };
    static deserialize(serialized: ISerialized<HttpMethodExactMatcher>): HttpPathExactMatcher;
}
export declare class HttpMethodExactMatcher implements IMatcher<Request>, ISerializable {
    private expected;
    readonly type = "method-exact";
    constructor(expected: string);
    match(req: Request): boolean;
    serialize(): {
        type: string;
        expected: string;
    };
    static deserialize(serialized: ISerialized<HttpMethodExactMatcher>): HttpMethodExactMatcher;
}
