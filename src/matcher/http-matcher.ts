import {Request} from 'express'
import {BaseMatcher} from './matcher'

export class HttpPathExactMatcher extends BaseMatcher<Request, string> {
  constructor(expected: string) {
    super('path-exact', (req: Request, expected: string) => req.path === expected, expected)
  }
}

export class HttpMethodExactMatcher extends BaseMatcher<Request, string> {
  constructor(expected: string) {
    super(
      'method-exact',
      (req: Request, expected: string) => req.method.toUpperCase() === expected.toUpperCase(),
      expected
    )
  }
}
