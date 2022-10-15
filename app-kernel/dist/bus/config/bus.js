"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MessageHandlerDef = exports.CommandBusDef = exports.QueryBusDef = exports.ValidatorMiddlewareDef = exports.createMessageRoute = exports.RouteTag = void 0;
const container_1 = require("../../di/container");
const command = __importStar(require("../command/command"));
const query = __importStar(require("../query/query"));
const transport_middleware_1 = require("../middleware/transport/transport-middleware");
const validator_1 = require("../middleware/validation/validator");
const di_handler_locator_1 = require("../handler-locator/di-handler-locator");
const logger_1 = __importDefault(require("../middleware/logger"));
const command_query_handler_1 = require("../command-query-handler");
exports.RouteTag = {
    name: 'bus-router'
};
function createMessageRoute(name, supports, clientDefinition) {
    const factory = (container) => {
        const client = container.get(clientDefinition);
        return {
            send: (message) => __awaiter(this, void 0, void 0, function* () { return yield client.send(message); }),
            supports
        };
    };
    return {
        factory,
        name,
        tags: [exports.RouteTag]
    };
}
exports.createMessageRoute = createMessageRoute;
exports.ValidatorMiddlewareDef = (0, container_1.createDefinition)('validator-middleware', (container) => new validator_1.ValidatorMiddleware(container));
exports.QueryBusDef = (0, container_1.createDefinition)('query-bus', (container) => {
    const handlerLocator = new di_handler_locator_1.DiHandlerLocator(container);
    const middlewares = [
        container.get(exports.ValidatorMiddlewareDef),
        new logger_1.default(),
        new transport_middleware_1.TransportMiddleware(container.getByTag(exports.RouteTag))
    ];
    return new query.QueryBus(handlerLocator, middlewares);
}, [{ name: 'query-bus' }]);
exports.CommandBusDef = (0, container_1.createDefinition)('command-bus', (container) => {
    const handlerLocator = new di_handler_locator_1.DiHandlerLocator(container);
    const middlewares = [
        container.get(exports.ValidatorMiddlewareDef),
        new logger_1.default(),
        new transport_middleware_1.TransportMiddleware(container.getByTag(exports.RouteTag))
    ];
    return new command.CommandBus(handlerLocator, middlewares);
}, [{ name: 'command-bus' }]);
exports.MessageHandlerDef = (0, container_1.createDefinition)('message-handler', (container) => {
    return new command_query_handler_1.CommandQueryHandler(container.get(exports.CommandBusDef), container.get(exports.QueryBusDef));
});
//# sourceMappingURL=bus.js.map