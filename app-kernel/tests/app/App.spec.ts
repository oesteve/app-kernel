import {CommandHandler, createCommand} from "../../src/bus/command/command";
import {createCommandHandler, createQueryHandler} from "../../src/bus/handler-locator/di-handler-locator";
import {createQuery, QueryHandler} from "../../src/bus/query/query";
import {createDefinition} from "../../src/di/container";
import Index from "../../src";


test('Handle a command', async () => {
  let count = 0

  interface Increment {
    amount: number
  }

  class IncrementHandler implements CommandHandler<Increment> {
    async handle (increment: Increment): Promise<void> {
      count += increment.amount
    }
  }

  const IncrementCommand = createCommand<Increment>('increment')
  const app = new Index([
    createCommandHandler(IncrementCommand, () => new IncrementHandler())
  ])

  await app.dispatch(IncrementCommand.with({ amount: 1 }))

  expect(count).toEqual(1)
})

test('Request a query', async () => {
  interface Greetings {
    name: string
  }

  class GreetingsHandler implements QueryHandler<Greetings, string> {
    async handle (query: Greetings): Promise<string> {
      return `Hello ${query.name}`
    }
  }

  const GreetingsQuery = createQuery<Greetings, string>('greetings')

  const app = new Index([
    createQueryHandler(GreetingsQuery, () => new GreetingsHandler())
  ])
  const queryMessage = GreetingsQuery.with({ name: 'Oscar' })
  const res = await app.query(queryMessage)

  expect(res).toEqual('Hello Oscar')
})

test('Define and retrieve a service', () => {
  const Bar = createDefinition('bar', () => 'foo')
  const app = new Index([Bar])
  const bar = app.get(Bar)

  expect(bar).toEqual('foo')
})
