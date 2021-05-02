import {Request} from 'express'
import {IMatcher} from './matcher'

export class HttpPathExactMatcher implements IMatcher<Request> {
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
    return new HttpMethodExactMatcher(serialized.expected)
  }
}

export class HttpMethodExactMatcher implements IMatcher<Request> {
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

export type AnyHttpMather = HttpPathExactMatcher | HttpMethodExactMatcher
export type AnyHttpMatherClass = typeof HttpPathExactMatcher | typeof HttpMethodExactMatcher
