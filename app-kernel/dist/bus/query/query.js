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
exports.QueryBus = exports.createQuery = exports.TYPE = void 0;
const bus_1 = require("../bus");
exports.TYPE = 'query';
function createQuery(name, namespace, schema) {
    const builder = (payload) => ({
        id: (0, bus_1.generateId)(),
        name,
        namespace,
        payload,
        type: exports.TYPE
    });
    return {
        with: builder,
        name,
        namespace,
        schema
    };
}
exports.createQuery = createQuery;
class QueryBus {
    constructor(handlerLocator, middlewares = []) {
        this.bus = new bus_1.Bus(handlerLocator);
        middlewares.forEach(middleware => this.bus.addMiddleware(middleware));
    }
    query(queryMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bus.dispatch(queryMessage);
        });
    }
}
exports.QueryBus = QueryBus;
//# sourceMappingURL=query.js.map