"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAnyMatcher = void 0;
var matcher_by_type_1 = require("./matcher-by-type");
var deserializeAnyMatcher = function (serializedMatcher) {
    var Matcher = matcher_by_type_1.matcherByType(serializedMatcher.type);
    return Matcher.deserialize(serializedMatcher);
};
exports.deserializeAnyMatcher = deserializeAnyMatcher;
//# sourceMappingURL=deserialize-any-matcher.js.map