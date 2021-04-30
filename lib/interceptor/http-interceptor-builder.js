"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptorBuilder = void 0;
var http_interceptor_1 = require("./http-interceptor");
var matcher_1 = require("../matcher/matcher");
var HttpInterceptorBuilder = /** @class */ (function () {
    function HttpInterceptorBuilder() {
        this.matcher = new matcher_1.AndMatcher();
    }
    HttpInterceptorBuilder.prototype.match = function (matcher) {
        this.matcher = new matcher_1.AndMatcher([matcher]);
        return this;
    };
    HttpInterceptorBuilder.prototype.andMatch = function (matcher) {
        this.matcher = this.matcher.and(matcher);
        return this;
    };
    HttpInterceptorBuilder.prototype.orMatch = function (matcher) {
        this.matcher = this.matcher.or(matcher);
        return this;
    };
    HttpInterceptorBuilder.prototype.resolveWith = function (resolver) {
        this.resolver = resolver;
        return this;
    };
    HttpInterceptorBuilder.prototype.buildInterceptor = function () {
        if (!this.resolver) {
            throw 'When the interceptor had been building, A response resolver was not set. You should use the withResponse method for example.';
        }
        return new http_interceptor_1.HttpInterceptor(this.matcher, this.resolver);
    };
    return HttpInterceptorBuilder;
}());
exports.HttpInterceptorBuilder = HttpInterceptorBuilder;
//# sourceMappingURL=http-interceptor-builder.js.map