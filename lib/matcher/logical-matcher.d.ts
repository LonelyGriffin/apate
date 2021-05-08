import { ISerialized, ISerializable } from '../serializable';
import { IMatcher, MatcherType } from './matcher';
export interface ILogicalMatcher<T> extends IMatcher<T> {
    or(matcher: IMatcher<T>): ILogicalMatcher<T>;
    and(matcher: IMatcher<T>): ILogicalMatcher<T>;
}
export declare abstract class LogicalMatcher<T> implements ILogicalMatcher<T>, ISerializable {
    protected matchers: Array<IMatcher<T>>;
    constructor(matchers?: Array<IMatcher<T>>);
    abstract readonly type: MatcherType;
    abstract match(target: T): boolean;
    or(matcher: IMatcher<T>): OrMatcher<T>;
    and(matcher: IMatcher<T>): AndMatcher<T>;
    serialize(): {
        type: MatcherType;
        matchers: unknown[];
    };
}
export declare class OrMatcher<T> extends LogicalMatcher<T> {
    readonly type: MatcherType;
    match(target: T): boolean;
    static deserialize<T>(serialized: ISerialized<OrMatcher<T>>): OrMatcher<T>;
}
export declare class AndMatcher<T> extends LogicalMatcher<T> {
    readonly type: MatcherType;
    match(target: T): boolean;
    static deserialize<T>(serialized: ISerialized<AndMatcher<T>>): AndMatcher<T>;
}
