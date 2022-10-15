import {createDefinition} from "@oesteve/app-kernel/dist/di/container";
import App from "@oesteve/app-kernel";


interface Printer {
    print(line: string): void
}

class ConsolePrinter implements Printer {
    print(line: string): void {
        console.log(line)
    }
}

class Calculator {
    constructor(private printer: Printer) {
    }
    sum(a: number, b: number) {
        const result = a + b;
        this.printer.print(`Result: ${result}`);
    }
}

const printerDef = createDefinition(
    'printer', 
    () => new ConsolePrinter()
);

const calculatorDef = createDefinition(
    'calculator', 
    (c) => new Calculator(c.get(printerDef))
)

class SilencedPrinter implements Printer {
    lastLine?: string
    print(line: string): void {
        this.lastLine = line
    }
}

const app = new App([
    printerDef,
    calculatorDef,
    {
        ...printerDef,
        factory: () => new SilencedPrinter()
    }
])

app.get(calculatorDef).sum(2,3)

const printer = app.get<SilencedPrinter>(printerDef)

expect(printer.lastLine).toEqual('Result: 5')



