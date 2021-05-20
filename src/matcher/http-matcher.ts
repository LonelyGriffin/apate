import {Request} from 'express'
import {ISerialized} from '../serializable'
import {CustomMatcher, IMatcher, MatcherType} from './matcher'

export type HttpMatcherConfig = {
  'path-exact'?: string
  'method-exact'?: string
}

export class HttpMatcher implements IMatcher<Request> {
  readonly type: MatcherType = 'http-matcher'
  constructor(private config: HttpMatcherConfig) {}
  match(req: Request): boolean {
    const propNames = Object.keys(this.config) as Array<keyof HttpMatcherConfig>
    return propNames.reduce<boolean>((result, propName) => result && this.matchByProp(req, propName), true)
  }

  serialize() {
    return {
      type: this.type,
      config: this.config
    }
  }

  static deserialize(serialized: ISerialized<HttpMatcher>) {
    return new HttpMatcher(serialized.config)
  }

  private matchByProp(req: Request, propName: keyof HttpMatcherConfig): boolean {
    const propValue = this.config[propName]

    if (propValue === undefined) {
      return true
    }

    switch (propName) {
      case 'path-exact':
        return this.matchByPathExactly(req, propValue)
      case 'method-exact':
        return this.matchByMethodExactly(req, propValue)
      default:
        return true
    }
  }

  private matchByPathExactly(req: Request, path: string) {
    return req.path === path
  }
  private matchByMethodExactly(req: Request, method: string) {
    return req.method.toUpperCase() === method.toUpperCase()
  }
}

export type CustomHttpMatcher<C> = CustomMatcher<Request, C>

export type AnyHttpMather = CustomHttpMatcher<any> | HttpMatcher
