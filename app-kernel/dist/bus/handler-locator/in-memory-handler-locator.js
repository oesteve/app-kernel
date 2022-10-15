"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryHandlerLocator = void 0;
const bus_1 = require("../bus");
class InMemoryHandlerLocator {
    constructor() {
        this.handlerMap = {};
    }
    addHandler(commandDefinition, handler) {
        this.handlerMap[commandDefinition.name] = handler;
    }
    handlerFor(message) {
        if (this.handlerMap[message.name] === undefined) {
            throw bus_1.HandlerNotFoundError.forMessage(message);
        }
        return this.handlerMap[message.name];
    }
}
exports.InMemoryHandlerLocator = InMemoryHandlerLocator;
//# sourceMappingURL=in-memory-handler-locator.js.map