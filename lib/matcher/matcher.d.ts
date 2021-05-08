import { ISerializable, ISerialized } from '../serializable';
export declare type MatcherType = 'custom' | 'or' | 'and' | 'path-exact' | 'method-exact';
export interface IMatcher<T> extends ISerializable {
    readonly type: MatcherType;
    match(target: T): boolean;
}
export declare class CustomMatcher<T, C = any> implements IMatcher<T> {
    private matcher;
    private context;
    readonly type: MatcherType;
    constructor(matcher: (target: T, context: C) => boolean, context: C);
    match(target: T): boolean;
    serialize(): {
        type: MatcherType;
        matcher: import("transferable-function").TransferableFunction;
        context: C;
    };
    static deserialize<T, C = unknown>(serialized: ISerialized<CustomMatcher<T, C>>): CustomMatcher<T, C>;
}
