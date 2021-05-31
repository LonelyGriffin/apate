"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAnyResolver = void 0;
var http_resolver_1 = require("./http-resolver");
var deserializeAnyResolver = function (serialized) {
    switch (serialized.type) {
        case 'custom':
            return http_resolver_1.HttpCustomResolver.deserialize(serialized);
        case 'static':
            return http_resolver_1.HttpResolver.deserialize(serialized);
        default:
            throw new Error('unknown resolver');
    }
};
exports.deserializeAnyResolver = deserializeAnyResolver;
//# sourceMappingURL=deserialize-any-resolver.js.map