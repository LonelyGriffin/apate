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
exports.HttpMocker = void 0;
var http_interceptor_builder_1 = require("./http-interceptor-builder");
var HttpMocker = /** @class */ (function (_super) {
    __extends(HttpMocker, _super);
    function HttpMocker(commitHandler) {
        if (commitHandler === void 0) { commitHandler = function (interceptor) { }; }
        var _this = _super.call(this, {}) || this;
        _this.commitHandler = commitHandler;
        return _this;
    }
    HttpMocker.prototype.commit = function () {
        var interceptor = this.buildInterceptor();
        this.commitHandler(interceptor);
        return interceptor;
    };
    return HttpMocker;
}(http_interceptor_builder_1.HttpInterceptorBuilder));
exports.HttpMocker = HttpMocker;
//# sourceMappingURL=http-mocker.js.map