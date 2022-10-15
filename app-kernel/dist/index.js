"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.createCommandHandler = exports.createQueryHandler = exports.createDefinition = exports.appTag = void 0;
const app_1 = __importDefault(require("./app"));
exports.default = app_1.default;
var app_2 = require("./app");
Object.defineProperty(exports, "appTag", { enumerable: true, get: function () { return app_2.appTag; } });
var container_1 = require("./di/container");
Object.defineProperty(exports, "createDefinition", { enumerable: true, get: function () { return container_1.createDefinition; } });
var di_handler_locator_1 = require("./bus/handler-locator/di-handler-locator");
Object.defineProperty(exports, "createQueryHandler", { enumerable: true, get: function () { return di_handler_locator_1.createQueryHandler; } });
Object.defineProperty(exports, "createCommandHandler", { enumerable: true, get: function () { return di_handler_locator_1.createCommandHandler; } });
var query_1 = require("./react/query");
Object.defineProperty(exports, "useQuery", { enumerable: true, get: function () { return query_1.useQuery; } });
//# sourceMappingURL=index.js.map