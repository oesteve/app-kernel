"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBeforeStopDefinition = exports.BeforeStartTag = exports.BeforeStopTag = void 0;
exports.BeforeStopTag = {
    name: 'before-stop'
};
exports.BeforeStartTag = {
    name: 'before-start'
};
const createBeforeStopDefinition = (name, factory) => {
    return {
        name,
        factory,
        tags: [exports.BeforeStopTag]
    };
};
exports.createBeforeStopDefinition = createBeforeStopDefinition;
//# sourceMappingURL=life-cycle.js.map