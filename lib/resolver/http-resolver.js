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
exports.HttpResolverWithBody = exports.HttpResolver = void 0;
var transferable_function_1 = require("transferable-function");
var HttpResolver = /** @class */ (function () {
    function HttpResolver(resolver, context, type) {
        if (type === void 0) { type = 'custom'; }
        this.resolver = resolver;
        this.context = context;
        this.type = type;
    }
    HttpResolver.prototype.resolve = function (req, res) {
        return this.resolver(req, res, this.context);
    };
    HttpResolver.prototype.serialize = function () {
        var resolver = transferable_function_1.serializeFn(this.resolver);
        return {
            resolver: resolver,
            context: this.context,
            type: this.type
        };
    };
    HttpResolver.deserialize = function (serialized) {
        return new HttpResolver(transferable_function_1.deserializeFn(serialized.resolver), serialized.context, serialized.type);
    };
    return HttpResolver;
}());
exports.HttpResolver = HttpResolver;
var HttpResolverWithBody = /** @class */ (function (_super) {
    __extends(HttpResolverWithBody, _super);
    function HttpResolverWithBody(body) {
        return _super.call(this, function (_, res, body) { return res.send(body); }, body, 'with-body') || this;
    }
    return HttpResolverWithBody;
}(HttpResolver));
exports.HttpResolverWithBody = HttpResolverWithBody;
//# sourceMappingURL=http-resolver.js.map