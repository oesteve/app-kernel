"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainer = exports.ContainerProvider = exports.getContext = void 0;
const react_1 = require("react");
const container_1 = require("../di/container");
let containerContext = null;
function getContext() {
    if (containerContext === null) {
        containerContext = (0, react_1.createContext)(new container_1.Container());
    }
    return containerContext;
}
exports.getContext = getContext;
class ContainerProvider extends react_1.Component {
    render() {
        return (0, react_1.createElement)(getContext().Provider, { value: this.props.container }, this.props.children);
    }
}
exports.ContainerProvider = ContainerProvider;
// export const ContainerProvider = (props: Props) => <ContainerContext.Provider value={props.container}>
//    { props.children }
// </ContainerContext.Provider>
const useContainer = () => {
    return (0, react_1.useContext)(getContext());
};
exports.useContainer = useContainer;
//# sourceMappingURL=container.js.map