"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMatcher = void 0;
var HttpMatcher = /** @class */ (function () {
    function HttpMatcher(config) {
        this.config = config;
        this.type = 'http-matcher';
    }
    HttpMatcher.prototype.match = function (req) {
        var _this = this;
        var propNames = Object.keys(this.config);
        return propNames.reduce(function (result, propName) { return result && _this.matchByProp(req, propName); }, true);
    };
    HttpMatcher.prototype.serialize = function () {
        return {
            type: this.type,
            config: this.config
        };
    };
    HttpMatcher.deserialize = function (serialized) {
        return new HttpMatcher(serialized.config);
    };
    HttpMatcher.prototype.matchByProp = function (req, propName) {
        var propValue = this.config[propName];
        if (propValue === undefined) {
            return true;
        }
        switch (propName) {
            case 'path-exact':
                return this.matchByPathExactly(req, propValue);
            case 'method-exact':
                return this.matchByMethodExactly(req, propValue);
            default:
                return true;
        }
    };
    HttpMatcher.prototype.matchByPathExactly = function (req, path) {
        return req.path === path;
    };
    HttpMatcher.prototype.matchByMethodExactly = function (req, method) {
        return req.method.toUpperCase() === method.toUpperCase();
    };
    return HttpMatcher;
}());
exports.HttpMatcher = HttpMatcher;
//# sourceMappingURL=http-matcher.js.map