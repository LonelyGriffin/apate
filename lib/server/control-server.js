"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlServer = void 0;
var express_1 = __importDefault(require("express"));
var http_interceptor_1 = require("../interceptor/http-interceptor");
var body_parser_1 = __importDefault(require("body-parser"));
var ControlServer = /** @class */ (function () {
    function ControlServer(host, port, mockServer) {
        var _this = this;
        this.host = host;
        this.port = port;
        this.mockServer = mockServer;
        this.handlePostHttpInterceptor = function (req, res) {
            var _a;
            var interceptors = req.body.map(function (x) { return http_interceptor_1.HttpInterceptor.deserialize(x); });
            (_a = _this.mockServer).queueInterceptors.apply(_a, __spreadArray([], __read(interceptors)));
            return res.send(200);
        };
        this.handlePostProxyEnable = function (req, res) {
            _this.mockServer.enableProxy();
            return res.send(200);
        };
        this.handlePostProxyDisable = function (req, res) {
            _this.mockServer.disableProxy();
            return res.send(200);
        };
        this.getCapturedProxyInterceptors = function (req, res) {
            var body = _this.mockServer.getCapturedProxyInterceptors().map(function (interceptor) { return interceptor.serialize(); });
            return res.send(body);
        };
        this.expressApp = express_1.default();
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.get('/health', function (_, res) { return res.send('OK'); });
        this.expressApp.post('/http-interceptors', this.handlePostHttpInterceptor);
        this.expressApp.post('/proxy/enable', this.handlePostProxyEnable);
        this.expressApp.post('/proxy/disable', this.handlePostProxyDisable);
        this.expressApp.get('/captured-proxy-interceptors', this.getCapturedProxyInterceptors);
    }
    ControlServer.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.expressServer) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.expressServer = _this.expressApp.listen(_this.port, _this.host, function (err) {
                                    return err ? reject(err) : resolve();
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ControlServer.prototype.shutdown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.expressServer) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var _a;
                                (_a = _this.expressServer) === null || _a === void 0 ? void 0 : _a.close(function (err) { return (err ? reject(err) : resolve()); });
                            })];
                    case 1:
                        _a.sent();
                        this.expressServer = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ControlServer;
}());
exports.ControlServer = ControlServer;
//# sourceMappingURL=control-server.js.map