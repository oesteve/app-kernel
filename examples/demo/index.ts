import {createDefinition} from "@oesteve/app-kernel/dist/di/container";
import App from "@oesteve/app-kernel";


class Counter {
    count= 0;
    increment() {
        this.count++
    }
}

const counterDef = createDefinition(
    'counter-service',
    () => new Counter()
)

class Printer {
    constructor(private counter: Counter) {
    }
    print() {
        return (`Count: ${app.get(counterDef).count}`)
    }
}

const printerDef = createDefinition(
    'printer-service',
    (container) => new Printer(
        container.get(counterDef)
    )
);

const app = new App([
    counterDef,
    printerDef
])

app.get(counterDef).increment()
const printer = app.get(printerDef);

printer.print()


