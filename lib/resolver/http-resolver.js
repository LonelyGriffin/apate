"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCustomResolver = exports.HttpResolver = void 0;
var transferable_function_1 = require("transferable-function");
var DEFAULT_CONFIG = {
    body: '',
    statusCode: 200,
    statusMessage: 'OK'
};
var HttpResolver = /** @class */ (function () {
    function HttpResolver(config) {
        this.type = 'static';
        this.config = __assign(__assign({}, DEFAULT_CONFIG), config);
    }
    HttpResolver.prototype.resolve = function (req, res) {
        res.status(this.config.statusCode);
        res.send(this.config.body);
        return res;
    };
    HttpResolver.prototype.serialize = function () {
        return {
            type: this.type,
            config: this.config
        };
    };
    HttpResolver.deserialize = function (serialized) {
        return new HttpResolver(serialized.config);
    };
    return HttpResolver;
}());
exports.HttpResolver = HttpResolver;
var HttpCustomResolver = /** @class */ (function () {
    function HttpCustomResolver(resolver, context) {
        this.resolver = resolver;
        this.context = context;
        this.type = 'custom';
    }
    HttpCustomResolver.prototype.resolve = function (req, res) {
        return this.resolver(req, res, this.context);
    };
    HttpCustomResolver.prototype.serialize = function () {
        var resolver = transferable_function_1.serializeFn(this.resolver);
        return {
            resolver: resolver,
            context: this.context,
            type: this.type
        };
    };
    HttpCustomResolver.deserialize = function (serialized) {
        return new HttpCustomResolver(transferable_function_1.deserializeFn(serialized.resolver), serialized.context);
    };
    return HttpCustomResolver;
}());
exports.HttpCustomResolver = HttpCustomResolver;
//# sourceMappingURL=http-resolver.js.map