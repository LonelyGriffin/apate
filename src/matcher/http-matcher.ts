import {Request} from 'express'
import {ISerializable, ISerialized} from '../serializable'
import {IMatcher} from './matcher'

export class HttpPathExactMatcher implements IMatcher<Request>, ISerializable {
  readonly type = 'path-exact'
  constructor(private expected: string) {}
  match(req: Request) {
    return req.path === this.expected
  }

  serialize() {
    return {
      type: this.type,
      expected: this.expected
    }
  }

  static deserialize(serialized: ISerialized<HttpMethodExactMatcher>) {
    return new HttpPathExactMatcher(serialized.expected)
  }
}

export class HttpMethodExactMatcher implements IMatcher<Request>, ISerializable {
  readonly type = 'method-exact'
  constructor(private expected: string) {}
  match(req: Request) {
    return req.method.toUpperCase() === this.expected.toUpperCase()
  }

  serialize() {
    return {
      type: this.type,
      expected: this.expected
    }
  }

  static deserialize(serialized: ISerialized<HttpMethodExactMatcher>) {
    return new HttpMethodExactMatcher(serialized.expected)
  }
}
