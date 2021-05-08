export interface ISerializable<T = unknown> {
    serialize(): T;
}
export declare type ISerialized<T extends ISerializable> = ReturnType<T['serialize']>;
