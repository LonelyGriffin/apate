"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptorBuilder = void 0;
var http_interceptor_1 = require("./http-interceptor");
var HttpInterceptorBuilder = /** @class */ (function () {
    function HttpInterceptorBuilder(matchConfig) {
        if (matchConfig === void 0) { matchConfig = {}; }
        this.matchConfig = matchConfig;
    }
    HttpInterceptorBuilder.prototype.withUrl = function (url) {
        this.matchConfig.url = url;
        return this;
    };
    HttpInterceptorBuilder.prototype.withMethod = function (method) {
        this.matchConfig.method = method;
        return this;
    };
    HttpInterceptorBuilder.prototype.withBody = function (body) {
        this.matchConfig.body = body;
        return this;
    };
    HttpInterceptorBuilder.prototype.withHeader = function (name, value) {
        if (!this.matchConfig.headers) {
            this.matchConfig.headers = {};
        }
        this.matchConfig.headers[name] = value;
        return this;
    };
    HttpInterceptorBuilder.prototype.withResponse = function (resolver) {
        this.resolver = resolver;
        return this;
    };
    HttpInterceptorBuilder.prototype.buildInterceptor = function () {
        if (!this.resolver) {
            throw 'When the interceptor had been building, A response resolver was not set. You should use the withResponse method for example.';
        }
        return new http_interceptor_1.HttpInterceptor(this.matchConfig, this.resolver);
    };
    return HttpInterceptorBuilder;
}());
exports.HttpInterceptorBuilder = HttpInterceptorBuilder;
//# sourceMappingURL=http-interceptor-builder.js.map