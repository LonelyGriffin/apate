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
exports.Apate = void 0;
var config_1 = require("./config");
var Apate = /** @class */ (function () {
    function Apate(config) {
        this.config = __assign(__assign({}, config_1.DEFAULT_CONFIG), config);
    }
    return Apate;
}());
exports.Apate = Apate;
//# sourceMappingURL=apate.js.map