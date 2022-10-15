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
exports.appTag = void 0;
const container_1 = require("./di/container");
const bus_1 = require("./bus/config/bus");
const life_cycle_1 = require("./life-cycle");
exports.appTag = {
    name: 'app'
};
class App {
    constructor(definitions = []) {
        this.started = false;
        const app = (0, container_1.createDefinition)('app', () => this, [exports.appTag]);
        this.container = new container_1.Container([
            ...definitions,
            app,
            bus_1.ValidatorMiddlewareDef,
            bus_1.CommandBusDef,
            bus_1.QueryBusDef,
            bus_1.MessageHandlerDef
        ]);
    }
    dispatch(queryMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startIfNeeded();
            return yield this.container.get(bus_1.CommandBusDef).dispatch(queryMessage);
        });
    }
    query(queryMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.startIfNeeded();
            return yield this.container.get(bus_1.QueryBusDef).query(queryMessage);
        });
    }
    get(definition) {
        void this.startIfNeeded();
        return this.container.get(definition);
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = this.container.getByTag(life_cycle_1.BeforeStopTag)
                .map((instance) => __awaiter(this, void 0, void 0, function* () { return yield instance.onBeforeStop(); }));
            yield Promise.all(res);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.startIfNeeded();
        });
    }
    startIfNeeded() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.started) {
                const res = this.container.getDefinitionsByTag(life_cycle_1.BeforeStartTag)
                    .map((definition) => __awaiter(this, void 0, void 0, function* () {
                    const instance = this.container.get(definition);
                    if (typeof instance.onBeforeStart !== 'function') {
                        throw new Error(`The ${definition.name} definition has been marked with the tag ${life_cycle_1.BeforeStartTag.name}, but it does not implement "onBeforeStart" method`);
                    }
                    return yield instance.onBeforeStart();
                }));
                yield Promise.all(res);
                this.started = true;
                return;
            }
            return yield Promise.resolve();
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map