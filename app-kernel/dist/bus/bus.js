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
exports.generateId = exports.Bus = exports.HandlerNotFoundError = exports.ExecutorMiddleware = void 0;
class ExecutorMiddleware {
    constructor(handlerLocator) {
        this.handlers = handlerLocator;
    }
    execute(message, next) {
        try {
            const handlerFor = this.handlers.handlerFor(message);
            return handlerFor(message.payload);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
exports.ExecutorMiddleware = ExecutorMiddleware;
class HandlerNotFoundError extends Error {
    static forMessage(message) {
        return new HandlerNotFoundError(`Handler form command ${message.name} not found`);
    }
}
exports.HandlerNotFoundError = HandlerNotFoundError;
class Bus {
    constructor(handlerLocator) {
        this.executionChain = () => __awaiter(this, void 0, void 0, function* () { return yield Promise.resolve(null); });
        this.handlerLocator = handlerLocator;
        const executorMiddleware = new ExecutorMiddleware(handlerLocator);
        this.addMiddleware(executorMiddleware);
    }
    addMiddleware(middleware) {
        const chain = this.executionChain;
        this.executionChain = (message) => __awaiter(this, void 0, void 0, function* () { return yield middleware.execute(message, chain); });
    }
    dispatch(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.executionChain(message);
        });
    }
}
exports.Bus = Bus;
const generateId = () => `${Math.floor(Math.random() * 10)}`;
exports.generateId = generateId;
//# sourceMappingURL=bus.js.map