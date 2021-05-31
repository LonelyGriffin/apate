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
exports.MockServer = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var http_interceptor_builder_1 = require("../interceptor/http-interceptor-builder");
var http_1 = __importDefault(require("http"));
var MockServer = /** @class */ (function () {
    function MockServer(host, port, proxyHost, proxyPort) {
        this.host = host;
        this.port = port;
        this.proxyHost = proxyHost;
        this.proxyPort = proxyPort;
        this.interceptorsQueue = [];
        this.proxyEnabled = false;
        this.capturedProxyInterceptors = [];
        this.expressApp = express_1.default();
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.all('/*', this.allRoutesHandler.bind(this));
    }
    MockServer.prototype.run = function () {
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
    MockServer.prototype.shutdown = function () {
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
    MockServer.prototype.queueInterceptors = function () {
        var _a;
        var interceptors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            interceptors[_i] = arguments[_i];
        }
        (_a = this.interceptorsQueue).push.apply(_a, __spreadArray([], __read(interceptors)));
    };
    MockServer.prototype.enableProxy = function () {
        this.proxyEnabled = true;
    };
    MockServer.prototype.disableProxy = function () {
        this.proxyEnabled = false;
    };
    MockServer.prototype.getCapturedProxyInterceptors = function () {
        return this.capturedProxyInterceptors;
    };
    MockServer.prototype.allRoutesHandler = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var scope, matchedAndUnresolved;
            return __generator(this, function (_a) {
                scope = req.query['apate-scope'];
                matchedAndUnresolved = this.interceptorsQueue.find(function (interceptor) { return !interceptor.isResolved && interceptor.match(req) && scope === interceptor.scope; });
                if (!matchedAndUnresolved) {
                    if (!this.proxyEnabled) {
                        throw 'Not found interceptor';
                    }
                    this.makeProxy(req, res);
                    return [2 /*return*/];
                }
                return [2 /*return*/, matchedAndUnresolved.resolve(req, res)];
            });
        });
    };
    MockServer.prototype.makeProxy = function (origReq, origRes) {
        var _this = this;
        var options = {
            host: this.proxyHost,
            port: this.proxyPort,
            path: origReq.path,
            method: origReq.method,
            headers: origReq.headers
        };
        var req = http_1.default
            .request(options, function (res) {
            var bodyString = '';
            res.on('data', function (chunk) {
                bodyString += chunk;
            });
            res.on('end', function () {
                var capturedInterceptor = new http_interceptor_builder_1.HttpInterceptorBuilder()
                    .match({
                    'method-exact': origReq.method,
                    'path-exact': origReq.path
                })
                    .resolve({
                    body: bodyString,
                    statusCode: res.statusCode,
                    statusMessage: origRes.statusMessage
                })
                    .buildInterceptor();
                _this.capturedProxyInterceptors.push(capturedInterceptor);
                capturedInterceptor.resolve(origReq, origRes);
                origRes.end();
            });
        })
            .on('error', function (e) {
            origRes.end();
        });
        req.end();
        origReq.on('data', function (chunk) { return req.write(chunk); });
    };
    return MockServer;
}());
exports.MockServer = MockServer;
//# sourceMappingURL=mock-server.js.map