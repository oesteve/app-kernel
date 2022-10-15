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
exports.DiHandlerLocator = exports.createQueryHandler = exports.createCommandHandler = void 0;
const bus_1 = require("../bus");
const container_1 = require("../../di/container");
function createCommandHandler(command, factory, handlerTags) {
    const tags = [{
            name: 'command-handler',
            commandName: command.name,
            commandNamespace: command.namespace
        }];
    if (handlerTags != null) {
        tags.concat(tags);
    }
    return {
        name: `${command.name}-handler`,
        factory,
        tags
    };
}
exports.createCommandHandler = createCommandHandler;
function createQueryHandler(command, factory, handlerTags) {
    const tags = [{
            name: 'command-handler',
            commandName: command.name,
            commandNamespace: command.namespace
        }];
    if (handlerTags != null) {
        tags.concat(tags);
    }
    return {
        name: `${command.name}-handler`,
        factory,
        tags
    };
}
exports.createQueryHandler = createQueryHandler;
class DiHandlerLocator {
    constructor(container) {
        this.container = container;
    }
    handlerFor(message) {
        const tag = {
            name: 'command-handler',
            commandName: message.name,
            commandNamespace: message.namespace
        };
        try {
            const handler = this.container.getOneByTag(tag);
            return (message) => __awaiter(this, void 0, void 0, function* () { return yield handler.handle(message); });
        }
        catch (err) {
            if (err instanceof container_1.DefinitionNotFoundException) {
                throw err;
            }
            throw bus_1.HandlerNotFoundError.forMessage(message);
        }
    }
}
exports.DiHandlerLocator = DiHandlerLocator;
//# sourceMappingURL=di-handler-locator.js.map