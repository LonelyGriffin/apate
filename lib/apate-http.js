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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApateHttp = void 0;
const DEFAULT_CONFIG = {
    mockHost: 'localhost',
    mockPort: 9000,
    controlHost: 'localhost',
    controlPort: 9100
};
class ApateHttp {
    constructor(config) {
        this.config = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
    }
    startMock() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    startControl() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startMock();
            yield this.startControl();
        });
    }
    stopMock() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    stopControl() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopMock();
            yield this.stopControl();
        });
    }
}
exports.ApateHttp = ApateHttp;
//# sourceMappingURL=apate-http.js.map