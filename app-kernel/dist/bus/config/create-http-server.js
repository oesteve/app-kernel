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
const life_cycle_1 = require("../../life-cycle");
const bus_1 = require("./bus");
const http_transport_server_1 = require("../middleware/transport/http-transport-server");
function createHttpServer(port, host = '0.0.0.0') {
    const factory = (container) => {
        const server = new http_transport_server_1.HttpServer(host, port, container.get(bus_1.MessageHandlerDef));
        return {
            server,
            onBeforeStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield server.start();
                });
            },
            onBeforeStop() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield server.stop();
                });
            }
        };
    };
    return {
        name: 'message-http-server',
        factory,
        tags: [life_cycle_1.BeforeStartTag, life_cycle_1.BeforeStopTag]
    };
}
exports.default = createHttpServer;
//# sourceMappingURL=create-http-server.js.map