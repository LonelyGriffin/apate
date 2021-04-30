"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodExactMatcher = exports.HttpPathExactMatcher = void 0;
var HttpPathExactMatcher = /** @class */ (function () {
    function HttpPathExactMatcher(expected) {
        this.expected = expected;
    }
    HttpPathExactMatcher.prototype.match = function (req) {
        debugger;
        return req.path === this.expected;
    };
    return HttpPathExactMatcher;
}());
exports.HttpPathExactMatcher = HttpPathExactMatcher;
var HttpMethodExactMatcher = /** @class */ (function () {
    function HttpMethodExactMatcher(expected) {
        this.expected = expected;
    }
    HttpMethodExactMatcher.prototype.match = function (req) {
        return req.method.toUpperCase() === this.expected.toUpperCase();
    };
    HttpMethodExactMatcher.prototype.serialize = function () {
        return {
            name: 'HttpMethodExactMatcher',
            expected: this.expected
        };
    };
    HttpMethodExactMatcher.deserialize = function (serializeObject) {
        return new HttpMethodExactMatcher(serializeObject.expected);
    };
    return HttpMethodExactMatcher;
}());
exports.HttpMethodExactMatcher = HttpMethodExactMatcher;
//# sourceMappingURL=http-matcher.js.map