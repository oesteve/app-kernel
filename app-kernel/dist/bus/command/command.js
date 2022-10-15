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
exports.CommandBus = exports.CommandMiddleware = exports.createCommand = exports.TYPE = void 0;
const bus_1 = require("../bus");
exports.TYPE = 'command';
function createCommand(name, namespace, schema) {
    const createCommand = (payload) => ({
        type: exports.TYPE,
        id: (0, bus_1.generateId)(),
        name,
        namespace,
        payload
    });
    return {
        type: exports.TYPE,
        with: createCommand,
        name,
        namespace,
        schema
    };
}
exports.createCommand = createCommand;
/**
 * Prevent return data
 */
class CommandMiddleware {
    execute(message, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield next(message).then((res) => {
                if (res !== undefined) {
                    throw new Error('Command handler can\'t return data');
                }
                return res;
            });
        });
    }
}
exports.CommandMiddleware = CommandMiddleware;
class CommandBus {
    constructor(handlerLocator, middlewares = []) {
        this.bus = new bus_1.Bus(handlerLocator);
        middlewares = [
            new CommandMiddleware(),
            ...middlewares
        ];
        middlewares.forEach(middleware => this.bus.addMiddleware(middleware));
    }
    dispatch(queryMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bus.dispatch(queryMessage);
        });
    }
}
exports.CommandBus = CommandBus;
//# sourceMappingURL=command.js.map