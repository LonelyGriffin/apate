'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
exports.HttpInterceptor = void 0
var deserialize_any_matcher_1 = require('../matcher/deserialize-any-matcher')
var http_resolver_1 = require('../resolver/http-resolver')
var HttpInterceptor = /** @class */ (function () {
  function HttpInterceptor(matcher, resolver) {
    this.matcher = matcher
    this.resolver = resolver
    this._isResolved = false
  }
  Object.defineProperty(HttpInterceptor.prototype, 'isResolved', {
    get: function () {
      return this._isResolved
    },
    enumerable: false,
    configurable: true
  })
  HttpInterceptor.prototype.match = function (req) {
    return this.matcher.match(req)
  }
  HttpInterceptor.prototype.resolve = function (req, res) {
    this._isResolved = true
    return this.resolver.resolve(req, res)
  }
  HttpInterceptor.prototype.serialize = function () {
    return {
      matcher: this.matcher.serialize(),
      resolver: this.resolver.serialize()
    }
  }
  HttpInterceptor.deserialize = function (serialized) {
    var matcher = deserialize_any_matcher_1.deserializeAnyMatcher(serialized.matcher)
    var resolver = http_resolver_1.HttpResolver.deserialize(serialized.resolver)
    return new HttpInterceptor(matcher, resolver)
  }
  return HttpInterceptor
})()
exports.HttpInterceptor = HttpInterceptor
//# sourceMappingURL=http-interceptor.js.map
