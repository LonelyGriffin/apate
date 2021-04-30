import {Request} from 'express'
import {IMatcher} from './matcher'

export interface IHttpMatcher extends IMatcher<Request> {}

export class HttpPathExactMatcher implements IHttpMatcher {
  constructor(private expected: string) {}
  match(req: Request) {
    debugger
    return req.path === this.expected
  }
}

export class HttpMethodExactMatcher implements IHttpMatcher, ISerializable {
  constructor(private expected: string) {}
  match(req: Request) {
    return req.method.toUpperCase() === this.expected.toUpperCase()
  }

  serialize() {
    return {
      name: 'HttpMethodExactMatcher',
      expected: this.expected
    }
  }

  static deserialize(serializeObject: SerializeObjectType<HttpMethodExactMatcher>) {
    return new HttpMethodExactMatcher(serializeObject.expected)
  }
}

interface ISerializable<T = unknown> {
  serialize(): T
}

type SerializeObjectType<T extends ISerializable> = ReturnType<T['serialize']>
