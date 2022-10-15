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
exports.createBus = void 0;
const in_memory_handler_locator_1 = require("../handler-locator/in-memory-handler-locator");
const bus_1 = require("../bus");
const createBus = () => {
    const handlerLocator = new in_memory_handler_locator_1.InMemoryHandlerLocator();
    const bus = new bus_1.Bus(handlerLocator);
    return {
        dispatch: (message) => __awaiter(void 0, void 0, void 0, function* () { return yield bus.dispatch(message); }),
        addHandler: (name, handler) => {
            const messageDefinition = {
                name,
                with(payload) {
                    return {
                        id: (0, bus_1.generateId)(),
                        name,
                        payload
                    };
                }
            };
            handlerLocator.addHandler(messageDefinition, handler);
            return messageDefinition;
        }
    };
};
exports.createBus = createBus;
//# sourceMappingURL=simple-bus.js.map