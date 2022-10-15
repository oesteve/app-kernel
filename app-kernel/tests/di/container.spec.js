"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebuggerPrinter = void 0;
const container_1 = require("../../src/di/container");
class DebuggerPrinter {
    constructor() {
        this.lines = [];
    }
    printLn(text) {
        this.lines.push(text);
    }
}
exports.DebuggerPrinter = DebuggerPrinter;
describe('Test container', () => {
    test('Retrieve instance', () => {
        const container = new container_1.Container();
        const printerDefinition = (0, container_1.createDefinition)('printer', () => new DebuggerPrinter());
        container.set(printerDefinition);
        const printer = container.get(printerDefinition);
        printer.printLn('Hola mundo');
        expect(container.get(printerDefinition).lines).toEqual(['Hola mundo']);
    });
    test('Retrieve by tag', () => {
        const container = new container_1.Container();
        const printerDefinition = (0, container_1.createDefinition)('printer', () => new DebuggerPrinter(), [{ name: 'printers' }]);
        container.set(printerDefinition);
        const printer = container.getOneByTagName('printers');
        printer.printLn('Hola mundo');
        expect(container.get(printerDefinition).lines).toEqual(['Hola mundo']);
    });
});
//# sourceMappingURL=container.spec.js.map