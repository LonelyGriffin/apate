"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlServerUrl = exports.mockServerUrl = void 0;
var mockServerUrl = function (config, path) {
    var baseUrl = config.mockProtocol + "://" + config.mockHost;
    var url = new URL(path, baseUrl);
    url.port = config.mockPort.toString();
    return url.toString();
};
exports.mockServerUrl = mockServerUrl;
var controlServerUrl = function (config, path) {
    var baseUrl = "http://" + config.controlHost;
    var url = new URL(path, baseUrl);
    url.port = config.controlPort.toString();
    return url.toString();
};
exports.controlServerUrl = controlServerUrl;
//# sourceMappingURL=utils.js.map