"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodExactMatcher = exports.HttpPathExactMatcher = void 0;
var HttpPathExactMatcher = /** @class */ (function () {
    function HttpPathExactMatcher(expected) {
        this.expected = expected;
        this.type = 'path-exact';
    }
    HttpPathExactMatcher.prototype.match = function (req) {
        return req.path === this.expected;
    };
    HttpPathExactMatcher.prototype.serialize = function () {
        return {
            type: this.type,
            expected: this.expected
        };
    };
    HttpPathExactMatcher.deserialize = function (serialized) {
        return new HttpMethodExactMatcher(serialized.expected);
    };
    return HttpPathExactMatcher;
}());
exports.HttpPathExactMatcher = HttpPathExactMatcher;
var HttpMethodExactMatcher = /** @class */ (function () {
    function HttpMethodExactMatcher(expected) {
        this.expected = expected;
        this.type = 'method-exact';
    }
    HttpMethodExactMatcher.prototype.match = function (req) {
        return req.method.toUpperCase() === this.expected.toUpperCase();
    };
    HttpMethodExactMatcher.prototype.serialize = function () {
        return {
            type: this.type,
            expected: this.expected
        };
    };
    HttpMethodExactMatcher.deserialize = function (serialized) {
        return new HttpMethodExactMatcher(serialized.expected);
    };
    return HttpMethodExactMatcher;
}());
exports.HttpMethodExactMatcher = HttpMethodExactMatcher;
//# sourceMappingURL=http-matcher.js.map