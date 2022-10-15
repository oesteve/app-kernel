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
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 2000
        });
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/${message.type}`;
            const body = JSON.stringify(message);
            return yield this.instance.post(url, body, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return res.data;
            });
        });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-transport-client.js.map