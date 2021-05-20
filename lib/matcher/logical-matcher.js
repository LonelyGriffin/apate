"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndMatcher = exports.OrMatcher = exports.LogicalMatcher = void 0;
var deserialize_any_matcher_1 = require("./deserialize-any-matcher");
var LogicalMatcher = /** @class */ (function () {
    function LogicalMatcher(matchers) {
        if (matchers === void 0) { matchers = []; }
        this.matchers = matchers;
    }
    LogicalMatcher.prototype.or = function (matcher) {
        return new OrMatcher([this, matcher]);
    };
    LogicalMatcher.prototype.and = function (matcher) {
        return new AndMatcher([this, matcher]);
    };
    LogicalMatcher.prototype.serialize = function () {
        return {
            type: this.type,
            matchers: this.matchers.map(function (matcher) { return matcher.serialize(); })
        };
    };
    return LogicalMatcher;
}());
exports.LogicalMatcher = LogicalMatcher;
var OrMatcher = /** @class */ (function (_super) {
    __extends(OrMatcher, _super);
    function OrMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'or-matcher';
        _this.context = undefined;
        return _this;
    }
    OrMatcher.prototype.match = function (target) {
        return this.matchers.reduce(function (result, matcher) { return result || matcher.match(target); }, false);
    };
    OrMatcher.deserialize = function (serialized) {
        var matchers = serialized.matchers.map(function (serializedMatcher) { return deserialize_any_matcher_1.deserializeAnyMatcher(serializedMatcher); });
        return new OrMatcher(matchers);
    };
    return OrMatcher;
}(LogicalMatcher));
exports.OrMatcher = OrMatcher;
var AndMatcher = /** @class */ (function (_super) {
    __extends(AndMatcher, _super);
    function AndMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'and-matcher';
        _this.context = undefined;
        return _this;
    }
    AndMatcher.prototype.match = function (target) {
        return this.matchers.reduce(function (result, matcher) { return result && matcher.match(target); }, true);
    };
    AndMatcher.deserialize = function (serialized) {
        var matchers = serialized.matchers.map(function (serializedMatcher) { return deserialize_any_matcher_1.deserializeAnyMatcher(serializedMatcher); });
        return new AndMatcher(matchers);
    };
    return AndMatcher;
}(LogicalMatcher));
exports.AndMatcher = AndMatcher;
//# sourceMappingURL=logical-matcher.js.map