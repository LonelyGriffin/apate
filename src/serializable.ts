export interface ISerializable<T = unknown> {
  serialize(): T
}

export type ISerialized<T extends ISerializable> = ReturnType<T['serialize']>
