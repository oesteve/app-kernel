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
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('bus');
class LoggerMiddleware {
    execute(message, next) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('Message received', message.id);
            return yield next(message).then(res => {
                debug('Message processed', message.name, message.id);
                return res;
            }).catch(err => {
                debug('Message error', message.name, message.id);
                throw err;
            });
        });
    }
}
exports.default = LoggerMiddleware;
//# sourceMappingURL=logger.js.map