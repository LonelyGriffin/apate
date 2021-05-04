"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMatcher = void 0;
var transferable_function_1 = require("transferable-function");
var CustomMatcher = /** @class */ (function () {
    function CustomMatcher(matcher, context) {
        this.matcher = matcher;
        this.context = context;
        this.type = 'custom';
    }
    CustomMatcher.prototype.match = function (target) {
        return this.matcher(target, this.context);
    };
    CustomMatcher.prototype.serialize = function () {
        return {
            type: this.type,
            matcher: transferable_function_1.serializeFn(this.matcher),
            context: this.context
        };
    };
    CustomMatcher.deserialize = function (serialized) {
        var matcher = transferable_function_1.deserializeFn(serialized.matcher);
        return new CustomMatcher(matcher, serialized.context);
    };
    return CustomMatcher;
}());
exports.CustomMatcher = CustomMatcher;
//# sourceMappingURL=matcher.js.map