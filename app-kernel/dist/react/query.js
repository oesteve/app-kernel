"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
const react_1 = require("react");
const container_1 = require("./container");
const useQuery = (queryDefinition) => {
    const container = (0, container_1.useContainer)();
    const queryBus = container.getOneByTagName('query-bus');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [data, setData] = (0, react_1.useState)();
    const callback = (payload) => {
        setLoading(true);
        queryBus.query(queryDefinition.with(payload))
            .then((res) => setData(res))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    };
    const query = (0, react_1.useCallback)(callback, []);
    return {
        data,
        loading,
        error,
        query
    };
};
exports.useQuery = useQuery;
//# sourceMappingURL=query.js.map