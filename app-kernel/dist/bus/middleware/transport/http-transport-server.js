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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class HttpServer {
    constructor(host, port, handler) {
        this.host = host;
        this.port = port;
        this.handler = handler;
        this.expressInstance = (0, express_1.default)();
        this.expressInstance.use((0, cors_1.default)());
        this.expressInstance.use(express_1.default.json());
        this.expressInstance.all('*', (req, res) => {
            this.handler.handle(req.body)
                .then(busResponses => {
                res.json(busResponses);
            })
                .catch((err) => {
                res.status(500);
                res.json(err);
            });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.expressServer = this.expressInstance.listen(this.port, this.host, () => {
                    console.log(`HTTP-Server Transport Middleware listening at ${this.host}:${this.port}`);
                    resolve();
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            const expressServer = this.expressServer;
            if (expressServer === undefined) {
                return yield Promise.resolve();
            }
            return yield new Promise(resolve => expressServer.close(() => resolve()));
        });
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=http-transport-server.js.map