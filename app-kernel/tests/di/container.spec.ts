import {Container, createDefinition, scopeContextTag} from '../../src/di/container'

export interface Printer {
  printLn: (text: string) => void
}

export class DebuggerPrinter implements Printer {
  lines: string[] = []

  printLn (text: string): void {
    this.lines.push(text)
  }
}

describe('Test container', () => {
  test('Retrieve instance', () => {
    const container = new Container()
    const printerDefinition = createDefinition(
      'printer',
      () => new DebuggerPrinter()
    )

    container.set(printerDefinition)

    const printer = container.get(printerDefinition)

    printer.printLn('Hola mundo')

    expect(container.get(printerDefinition).lines).toEqual(['Hola mundo'])
  })

  test('Retrieve by tag', () => {
    const container = new Container()
    const printerDefinition = createDefinition(
      'printer',
      () => new DebuggerPrinter(),
      [{ name: 'printers' }]
    )

    container.set(printerDefinition)

    const printer = container.getOneByTagName<Printer>('printers')

    printer.printLn('Hola mundo')

    expect(container.get(printerDefinition).lines).toEqual(['Hola mundo'])
  })
  
  test("replace definition", () =>  {

    let a = { name: "my-definition", tags: [], factory: () => "foo"};
    let b = { name: "my-definition", tags: [], factory: () => "bar"};
    const container = new Container([a, b])
    
    expect(container.get(b)).toEqual("bar")
    expect(container.definitions).toHaveLength(1)
    
  })
})
