export interface ILogicalMatcher<T> extends IMatcher<T> {
    or(matcher: IMatcher<T>): ILogicalMatcher<T>;
    and(matcher: IMatcher<T>): ILogicalMatcher<T>;
}
export interface IMatcher<T> {
    match(target: T): boolean;
}
export declare abstract class LogicalMatcher<T> implements ILogicalMatcher<T> {
    protected matchers: Array<IMatcher<T>>;
    constructor(matchers?: Array<IMatcher<T>>);
    abstract match(target: T): boolean;
    or(matcher: IMatcher<T>): OrMatcher<T>;
    and(matcher: IMatcher<T>): AndMatcher<T>;
}
export declare class OrMatcher<T> extends LogicalMatcher<T> {
    match(target: T): boolean;
}
export declare class AndMatcher<T> extends LogicalMatcher<T> {
    match(target: T): boolean;
}
