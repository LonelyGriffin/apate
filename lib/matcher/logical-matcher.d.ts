import { ISerialized, ISerializable } from '../serializable';
import { IMatcher, MatcherType } from './matcher';
export declare abstract class LogicalMatcher<T> implements IMatcher<T>, ISerializable {
    protected matchers: Array<IMatcher<T>>;
    constructor(matchers?: Array<IMatcher<T>>);
    abstract readonly type: MatcherType;
    abstract match(target: T): boolean;
    or(matcher: IMatcher<T>): OrMatcher<T>;
    and(matcher: IMatcher<T>): AndMatcher<T>;
    serialize(): {
        type: MatcherType;
        matchers: IMatcher<T>[];
    };
}
export declare class OrMatcher<T> extends LogicalMatcher<T> {
    readonly type: MatcherType;
    readonly context: undefined;
    match(target: T): boolean;
    static deserialize<T>(serialized: ISerialized<OrMatcher<T>>): OrMatcher<T>;
}
export declare class AndMatcher<T> extends LogicalMatcher<T> {
    readonly type: MatcherType;
    readonly context: undefined;
    match(target: T): boolean;
    static deserialize<T>(serialized: ISerialized<AndMatcher<T>>): AndMatcher<T>;
}
