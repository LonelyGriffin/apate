"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAnyMatcher = void 0;
var http_matcher_1 = require("./http-matcher");
var logical_matcher_1 = require("./logical-matcher");
var matcher_1 = require("./matcher");
var deserializeAnyMatcher = function (serialized) {
    switch (serialized.type) {
        case 'custom-matcher':
            return matcher_1.CustomMatcher.deserialize(serialized);
        case 'or-matcher':
            return logical_matcher_1.OrMatcher.deserialize(serialized);
        case 'and-matcher':
            return logical_matcher_1.AndMatcher.deserialize(serialized);
        case 'http-matcher':
            return http_matcher_1.HttpMatcher.deserialize(serialized);
        default:
            throw new Error('unknown matcher');
    }
};
exports.deserializeAnyMatcher = deserializeAnyMatcher;
//# sourceMappingURL=deserialize-any-matcher.js.map