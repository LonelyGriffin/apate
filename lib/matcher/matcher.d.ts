import { ISerializable, ISerialized } from '../serializable';
export declare type MatcherType = 'custom-matcher' | 'or-matcher' | 'and-matcher' | 'http-matcher';
export interface IMatcher<T> extends ISerializable {
    readonly type: MatcherType;
    match(target: T): boolean;
    serialize(): {
        type: MatcherType;
    };
}
export declare class CustomMatcher<T, C = unknown> implements IMatcher<T> {
    private matcher;
    readonly context: C;
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
