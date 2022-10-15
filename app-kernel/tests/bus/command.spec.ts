import {CommandBus, createCommand} from "../../src/bus/command/command";
import {InMemoryHandlerLocator} from "../../src/bus/handler-locator/in-memory-handler-locator";
import {HandlerNotFoundError, Message} from "../../src/bus/bus";
// @ts-ignore
import schema from './test.schema.json'

describe('CommandBus basics', function () {
  test('The function way to create a  command', () => {
    const command = createCommand<{bar: string }>(
      'my-command',
      'app',
      schema
    )
    const message = command.with({ bar: 'foo' })

    expect(message.payload).toEqual({ bar: 'foo' })
    expect(command.name).toEqual('my-command')
    expect(command.namespace).toEqual('app')
  })

  test('Handler not found error', async () => {
    const AddTask = createCommand<{ task: string }>('add-task')
    const handlerLocator = new InMemoryHandlerLocator()
    const commandBus = new CommandBus(handlerLocator)

    const execution = commandBus.dispatch(
      AddTask.with({ task: 'Do laundry' })
    )

    await expect(execution).rejects.toEqual(new HandlerNotFoundError(
      'Handler form command add-task not found'
    ))
  })

  test('Handle a command', async () => {
    const todo: string[] = []
    const AddTask = createCommand<{ task: string }>('add-task')

    const handlerLocator = new InMemoryHandlerLocator()

    handlerLocator.addHandler(AddTask, async (addTask) => {
      todo.push(addTask.task)
      return await Promise.resolve()
    })

    const commandBus = new CommandBus(handlerLocator)
    await commandBus.dispatch(AddTask.with({ task: 'Do laundry' }))

    expect(todo).toEqual(['Do laundry'])
  })

  test('Middleware execution', async () => {
    const executedTasks: string[] = []

    const AddTask = createCommand<{ task: string }>('add-task')

    const handlerLocator = new InMemoryHandlerLocator()
    handlerLocator.addHandler(AddTask, async (addTask) => await Promise.resolve())

    const commandBus = new CommandBus(
      handlerLocator,
      [{
        execute (message: Message<any>, next: (messages: Message<any>) => void): any {
          executedTasks.push(message.name)
          next(message)
        }
      }]
    )

    const addTask = AddTask.with({ task: 'Do laundry' })

    await commandBus.dispatch(addTask)

    expect(executedTasks).toEqual(['add-task'])
  })

  test('Unable to get return data from command', async () => {
    const GetGreetings = createCommand<{ name: string }>('get-greetings')
    const handlerLocator = new InMemoryHandlerLocator()

    handlerLocator.addHandler(
      GetGreetings,
      async ({ name }) => `Hello ${name} !`
    )

    const commandBus = new CommandBus(handlerLocator)
    const execute = async (): Promise<void> => await commandBus.dispatch(
      GetGreetings.with({ name: 'Oscar' }))

    await expect(execute())
      .rejects
      .toThrow("Command handler can't return data")
  })
})
