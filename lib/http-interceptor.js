"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
var HttpInterceptor = /** @class */ (function () {
    function HttpInterceptor(matchConfig, resolver) {
        this.matchConfig = matchConfig;
        this.resolver = resolver;
        this._isResolved = false;
    }
    Object.defineProperty(HttpInterceptor.prototype, "isResolved", {
        get: function () {
            return this._isResolved;
        },
        enumerable: false,
        configurable: true
    });
    HttpInterceptor.prototype.match = function (req) {
        return true;
    };
    HttpInterceptor.prototype.resolve = function (req, res) {
        this._isResolved = true;
        return this.resolver(req, res);
    };
    return HttpInterceptor;
}());
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=http-interceptor.js.map