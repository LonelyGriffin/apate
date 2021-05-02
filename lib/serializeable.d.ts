interface ISerializable<T = unknown> {
    serialize(): T;
}
declare type ISerialized<T extends ISerializable> = ReturnType<T['serialize']>;
