"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptorBuilder = void 0;
var http_interceptor_1 = require("./http-interceptor");
var logical_matcher_1 = require("../matcher/logical-matcher");
var matcher_by_type_1 = require("../matcher/matcher-by-type");
var HttpInterceptorBuilder = /** @class */ (function () {
    function HttpInterceptorBuilder() {
        this.matcher = new logical_matcher_1.AndMatcher();
        this.matchArgsToMatcher = function (args) {
            if (typeof args[0] === 'string') {
                var MatcherClass = matcher_by_type_1.matcherByType(args[0]);
                return new (MatcherClass.bind.apply(MatcherClass, __spreadArray([void 0], __read(args.slice(1)))))();
            }
            return args[0];
        };
    }
    HttpInterceptorBuilder.prototype.match = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.matcher = new logical_matcher_1.AndMatcher([this.matchArgsToMatcher(args)]);
        return this;
    };
    HttpInterceptorBuilder.prototype.andMatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.matcher = this.matcher.and(this.matchArgsToMatcher(args));
        return this;
    };
    HttpInterceptorBuilder.prototype.orMatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.matcher = this.matcher.or(this.matchArgsToMatcher(args));
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