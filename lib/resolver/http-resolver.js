'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
exports.HttpResolver = void 0
var transferable_function_1 = require('transferable-function')
var HttpResolver = /** @class */ (function () {
  function HttpResolver(resolver, context) {
    this.resolver = resolver
    this.context = context
  }
  HttpResolver.prototype.resolve = function (req, res) {
    return this.resolver(req, res, this.context)
  }
  HttpResolver.prototype.serialize = function () {
    var resolver = transferable_function_1.serializeFn(this.resolver)
    return {
      resolver: resolver,
      context: this.context
    }
  }
  HttpResolver.deserialize = function (serialized) {
    return new HttpResolver(transferable_function_1.deserializeFn(serialized.resolver), serialized.context)
  }
  return HttpResolver
})()
exports.HttpResolver = HttpResolver
//# sourceMappingURL=http-resolver.js.map
