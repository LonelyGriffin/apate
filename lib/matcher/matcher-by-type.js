"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matcherByType = void 0;
var http_matcher_1 = require("./http-matcher");
var logical_matcher_1 = require("./logical-matcher");
var matcher_1 = require("./matcher");
var matcherByType = function (type) {
    switch (type) {
        case 'custom':
            return matcher_1.CustomMatcher;
        case 'or':
            return logical_matcher_1.OrMatcher;
        case 'and':
            return logical_matcher_1.AndMatcher;
        case 'method-exact':
            return http_matcher_1.HttpMethodExactMatcher;
        case 'path-exact':
            return http_matcher_1.HttpPathExactMatcher;
    }
};
exports.matcherByType = matcherByType;
//# sourceMappingURL=matcher-by-type.js.map