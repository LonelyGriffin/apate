interface ISerializable<T = unknown> {
  serialize(): T
}

type ISerialized<T extends ISerializable> = ReturnType<T['serialize']>
