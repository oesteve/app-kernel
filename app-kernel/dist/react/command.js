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
exports.useCommand = void 0;
const container_1 = require("./container");
const react_1 = require("react");
const useCommand = (messageDef) => {
    const container = (0, container_1.useContainer)();
    const commandBus = container.getOneByTagName('command-bus');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const dispatch = (0, react_1.useCallback)((payload) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            yield commandBus.dispatch(messageDef.with(payload === undefined ? payload : {}));
        }
        catch (err) {
            setError(err);
        }
        setLoading(false);
    }), []);
    return {
        loading,
        error,
        dispatch
    };
};
exports.useCommand = useCommand;
//# sourceMappingURL=command.js.map